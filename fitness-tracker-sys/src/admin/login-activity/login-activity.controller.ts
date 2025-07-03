import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LoginActivityService } from './login-activity.service';

@Controller('login-activity')
export class LoginActivityController {
  constructor(private readonly service: LoginActivityService) {}

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  @Get('line-chart')
  getLineChart() {
    return this.service.getLineChartData();
  }

@Get('heatmap')
getHeatmap() {
  return this.service.getWeeklyHeatmap();
}

@Get('weekly-logins')
async getWeeklyLogins() {
  return this.service.getWeeklyLoginData();
}

  @Get('recent')
  async getRecentLogins(@Query('limit') limit?: number) {
    const parsedLimit = limit ? parseInt(limit.toString(), 10) : 10;
    return this.service.getRecentLoginActivities(parsedLimit);
  }

}
