import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { LoginActivity } from '../Entity/login-activity.entity';
import * as moment from 'moment';

@Injectable()
export class LoginActivityService {
  constructor(
    @InjectRepository(LoginActivity)
    private loginRepo: Repository<LoginActivity>,
  ) {}

  // Helper function to format peak hour to 2-hour range string
  private formatPeakTimeRange(hour: number | null): string | null {
  if (hour === null) return null;

  // Define ranges start times (in 24h) and their labels
  const ranges = [
    { start: 0, label: '12 am - 2 am' },
    { start: 2, label: '2 am - 4 am' },
    { start: 4, label: '4 am - 6 am' },
    { start: 6, label: '6 am - 8 am' },
    { start: 8, label: '8 am - 10 am' },
    { start: 10, label: '10 am - 12 pm' },
    { start: 12, label: '12 pm - 2 pm' },
    { start: 14, label: '2 pm - 4 pm' },
    { start: 16, label: '4 pm - 6 pm' },
    { start: 18, label: '6 pm - 8 pm' },
    { start: 20, label: '8 pm - 10 pm' },
    { start: 22, label: '10 pm - 12 am' },
  ];

  // Find range where hour belongs
  for (const range of ranges) {
    if (hour >= range.start && hour < range.start + 2) {
      return range.label;
    }
  }

  return null; // fallback
}


  async getStats() {
  // Define start and end of current ISO week (Monday to Sunday)
  const startOfWeek = moment().startOf('isoWeek').toDate();
  const endOfWeek = moment().endOf('isoWeek').toDate();

  // Total successful logins in current week
  const totalLogins = await this.loginRepo.count({
    where: { timestamp: Between(startOfWeek, endOfWeek), success: true },
  });

  // Total failed login attempts in current week
  const failedAttempts = await this.loginRepo.count({
    where: { timestamp: Between(startOfWeek, endOfWeek), success: false },
  });

  // Top 3 frequent login locations with count (non-null locations only)
  const frequentLocations = await this.loginRepo
    .createQueryBuilder('login')
    .select('login.location', 'location')
    .addSelect('COUNT(*)', 'count')
    .where('login.timestamp BETWEEN :start AND :end', { start: startOfWeek, end: endOfWeek })
    .andWhere('login.success = true')
    .andWhere('login.location IS NOT NULL')
    .groupBy('login.location')
    .orderBy('count', 'DESC')
    .limit(1)
    .getRawMany();

  // Peak login hour (hour with most successful logins)
  const peakLoginHourResult = await this.loginRepo
    .createQueryBuilder('login')
    .select("EXTRACT(HOUR FROM login.timestamp)", "hour")
    .addSelect("COUNT(*)", "count")
    .where('login.timestamp BETWEEN :start AND :end', { start: startOfWeek, end: endOfWeek })
    .andWhere('login.success = true')
    .groupBy("hour")
    .orderBy("count", "DESC")
    .limit(1)
    .getRawOne();

  // Convert peak login hour (number) to 2-hour time range string
  const peakLoginHour = peakLoginHourResult ? Number(peakLoginHourResult.hour) : null;
  const peakLoginTime = this.formatPeakTimeRange(peakLoginHour);

  return {
    totalLogins,
    failedAttempts,
    frequentLocations,
    peakLoginTime, // e.g. "8 am - 10 am"
    range: {
      from: startOfWeek,
      to: endOfWeek,
    },
  };
}


  async getLineChartData() {
    const now = moment();
    const last24h = now.clone().subtract(24, 'hours');

    const logs = await this.loginRepo.find({
      where: {
        timestamp: Between(last24h.toDate(), now.toDate()),
      },
      order: { timestamp: 'ASC' },
    });

    const hourlyData = Array(24).fill(0);
    logs.forEach((log) => {
      const hourDiff = now.diff(moment(log.timestamp), 'hours');
      const index = 23 - hourDiff;
      if (index >= 0 && index < 24) {
        hourlyData[index]++;
      }
    });

    return hourlyData;
  }

  async getWeeklyHeatmap(): Promise<number[][]> {
    const startOfWeek = moment().startOf('isoWeek'); // Monday
    const endOfWeek = moment().endOf('isoWeek');     // Sunday

    const logs = await this.loginRepo.find({
      where: {
        timestamp: Between(startOfWeek.toDate(), endOfWeek.toDate()),
      },
    });

    // 7 days × 9 time buckets (6 AM to 12 AM)
    const heatmap: number[][] = Array(7)
      .fill(null)
      .map(() => Array(9).fill(0));

    logs.forEach((log) => {
      const ts = moment(log.timestamp);
      const dayIdx = ts.isoWeekday() - 1; // Monday = 1 → index 0
      const hour = ts.hour();

      const timeIndex =
        hour >= 6 && hour < 8
          ? 0
          : hour >= 8 && hour < 10
          ? 1
          : hour >= 10 && hour < 12
          ? 2
          : hour >= 12 && hour < 14
          ? 3
          : hour >= 14 && hour < 16
          ? 4
          : hour >= 16 && hour < 18
          ? 5
          : hour >= 18 && hour < 20
          ? 6
          : hour >= 20 && hour < 24
          ? 7
          : hour < 6
          ? 8
          : -1;

      if (dayIdx >= 0 && dayIdx < 7 && timeIndex !== -1) {
        heatmap[dayIdx][timeIndex]++;
      }
    });

    return heatmap;
  }

    async getWeeklyLoginData() {
  const today = moment().startOf('day');
  const sevenDaysAgo = today.clone().subtract(6, 'days'); // includes today

  console.log('Query range:', sevenDaysAgo.toDate(), 'to', today.endOf('day').toDate());

  const dateMap: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const dateStr = sevenDaysAgo.clone().add(i, 'days').format('YYYY-MM-DD');
    dateMap[dateStr] = 0;
  }

  const logs = await this.loginRepo
    .createQueryBuilder('login')
    .select("TO_CHAR(login.timestamp AT TIME ZONE 'UTC', 'YYYY-MM-DD')", "date")
    .addSelect("COUNT(*)", "count")
    .where('login.timestamp BETWEEN :start AND :end', { start: sevenDaysAgo.toDate(), end: today.endOf('day').toDate() })
    .andWhere('login.success = true')
    .groupBy("date")
    .orderBy("date", "ASC")
    .getRawMany();

  console.log('Query result:', logs);

  logs.forEach(log => {
    const date = log.date;
    const count = parseInt(log.count, 10);
    if (dateMap[date] !== undefined) {
      dateMap[date] = count;
    }
  });

  const result = Object.entries(dateMap).map(([date, logins]) => ({
    date,
    logins,
  }));

  return result;
}


async getRecentLoginActivities(limit = 10) {
  const recentLogs = await this.loginRepo.find({
    where: { success: true },
    order: { timestamp: 'DESC' },
    take: limit,
  });

  return recentLogs.map((log) => ({
    name: this.extractNameFromEmail(log.email), // optional enhancement
    email: log.email,
    location: log.location,
    timestamp: log.timestamp,
  }));
}

// Optional helper to get a mock name from email (fallback to initials if needed)
private extractNameFromEmail(email: string): string {
  const username = email.split('@')[0];
  const parts = username.split('.');
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') || 'User';
}


}
