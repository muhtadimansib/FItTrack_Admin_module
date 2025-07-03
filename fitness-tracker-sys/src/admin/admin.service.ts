import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, MoreThan, Repository } from 'typeorm';
import { PendingUsers } from './PendingUsers.entity';
import { MessageService } from './message/message.service';
import { Client } from './Entity/Client.entity';
import { Trainer } from './Entity/Trainer.entity';
import { Nutritionist } from './Entity/Nutritionist.entity';
import { Exercise } from './Entity/Exercise.entity';
import { NutritionEntry } from './Entity/NutritionEntry.entity';
import { WorkoutPlan } from './Entity/WorkoutPlan.entity';
import { Report } from './Entity/Report.entity';
import { Report as ReportEntity } from '../admin/Entity/Report.entity';

@Injectable()
export class AdminService {

    constructor(

        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,

        @InjectRepository(Report)
        private reportRepo: Repository<Report>,

        @InjectRepository(WorkoutPlan)
        private workoutPlanRepo: Repository<WorkoutPlan>,
  
        @InjectRepository(Exercise)
        private exerciseRepo: Repository<Exercise>,
        
        @InjectRepository(NutritionEntry)
        private nutritionEntryRepo: Repository<NutritionEntry>,

        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,

        @InjectRepository(Trainer)
        private readonly trainerRepo: Repository<Trainer>,

        @InjectRepository(Nutritionist)
        private readonly nutritionistRepo: Repository<Nutritionist>,

        @InjectRepository(PendingUsers)
        private PendingUsersRepo: Repository<PendingUsers>,
        private readonly messageService: MessageService
        
    ) {}

    
    // async getDashboardInfo(user: any) {
    //     const { password, ...withoutPassword } = user;
    
    //     const unreadCount = await this.messageService.countUnreadMessagesForUser(
    //       user.email,
    //       user.role,
    //     );
    
    //     return {
    //       message: 'Welcome to the Admin Dashboard',
    //       user: withoutPassword,
    //       unreadMessages: unreadCount,
    //     };
    //   }

    async getDashboardInfo(user: any) {
    const { password, ...withoutPassword } = user;

    const unreadCount = await this.messageService.countUnreadMessagesForUser(
        user.email,
        user.role,
    );

    // Total Users
    const totalClients = await this.clientRepo.count();
    const totalTrainers = await this.trainerRepo.count();
    const totalNutritionists = await this.nutritionistRepo.count();
    const totalUsers = totalClients + totalTrainers + totalNutritionists;

    // Define threshold — last 24 hours
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 1);

    // Fetch and map each type with role info
    const newClients = (
        await this.clientRepo.find({
        where: { createdAt: MoreThan(thresholdDate) },
        select: ['name', 'email', 'createdAt'],
        order: { createdAt: 'DESC' },
        })
    ).map((client) => ({ ...client, role: 'Client' }));

    const newTrainers = (
        await this.trainerRepo.find({
        where: { createdAt: MoreThan(thresholdDate) },
        select: ['name', 'email', 'createdAt'],
        order: { createdAt: 'DESC' },
        })
    ).map((trainer) => ({ ...trainer, role: 'Trainer' }));

    const newNutritionists = (
        await this.nutritionistRepo.find({
        where: { createdAt: MoreThan(thresholdDate) },
        select: ['name', 'email', 'createdAt'],
        order: { createdAt: 'DESC' },
        })
    ).map((nutritionist) => ({ ...nutritionist, role: 'Nutritionist' }));

    // Combine and sort all
    const latestUsers = [...newClients, ...newTrainers, ...newNutritionists].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    const latestUsersCount = latestUsers.length;

    // Pending Requests
    const pendingRequests = await this.PendingUsersRepo.count({
        where: { Status: 'Pending' },
    });

    // Total workout data
    const totalWorkoutPlans = await this.workoutPlanRepo.count();
    const totalExercises = await this.exerciseRepo.count();
    const totalNutritionEntries = await this.nutritionEntryRepo.count();

    // Total open reports
    const totalOpenReports = await this.reportRepo.count({
        where: { status: 'Open' },
    });

    return {
        message: 'Welcome to the Admin Dashboard',
        user: withoutPassword,
        unreadMessages: unreadCount,
        totalClients,
        totalTrainers,
        totalNutritionists,
        totalUsers,
        pendingRequests,
        latestUsersCount,
        latestUsers,
        totalWorkoutPlans,
        totalExercises,
        totalNutritionEntries,
        totalOpenReports
    };
    }

    ShowPendingUsers()
        {
            return this.PendingUsersRepo.find({ where: { Status: 'Pending' } });
        }

    ShowRejectedUsers()
        {
            return this.PendingUsersRepo.find({where: {Status: 'Rejected'}})
        }

    ShowApprovedUsers()
    {
        {
            return this.PendingUsersRepo.find({where: {Status: 'Approved'}})
        }
    }

    // Approve a pending user by ID
    // async approveUser(id: number): Promise<string> {
    //     const user = await this.PendingUsersRepo.findOne({ where: { UserId: id } });

    //     if (!user) {
    //     throw new NotFoundException('User not found');
    //     }

    //     if (user.Status !== 'Pending') {
    //     return `User is already ${user.Status}`;
    //     }

    //     user.Status = 'Approved';
    //     await this.PendingUsersRepo.save(user);

    //     return 'User approved successfully';
    // }

    // Approve a pending user by ID
    async approveUser(id: number): Promise<string> {
    const user = await this.PendingUsersRepo.findOne({ where: { UserId: id } });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    if (user.Status !== 'Pending') {
        return `User is already ${user.Status}`;
    }

    // Insert into Trainer or Nutritionist table based on role
    if (user.RoleRequested === 'Trainer') {
        await this.trainerRepo.save({
        name: user.UName,
        email: user.Email,
        password: user.Password,
        specialization: user.Specialization,
        certification: user.Certification,
        experience: user.ExperienceYears,
        bio: user.Bio,
        profileImageUrl: user.ProfileImageUrl,
        });
    } else if (user.RoleRequested === 'Nutritionist') {
        await this.nutritionistRepo.save({
        name: user.UName,
        email: user.Email,
        password: user.Password,
        specialization: user.Specialization,
        certification: user.Certification,
        experience: user.ExperienceYears,
        bio: user.Bio,
        profileImageUrl: user.ProfileImageUrl,
        });
    }

    // Update status in pending users
    user.Status = 'Approved';
    await this.PendingUsersRepo.save(user);

    return 'User approved and added to respective role successfully';
    }


    //Reject a user
    async rejectUser(id: number): Promise<string> {
        const user = await this.PendingUsersRepo.findOne({ where: { UserId: id } });

        if (!user) {
        throw new NotFoundException('User not found');
        }

        if (user.Status !== 'Pending') {
        return `User is already ${user.Status}`;
        }

        user.Status = 'Rejected';
        await this.PendingUsersRepo.save(user);

        return 'User rejected successfully';
    }


    //Recent Exercises
    async getLatestExercises(limit = 5): Promise<Exercise[]> {
        return this.exerciseRepository.find({
        order: {
            createdAt: 'DESC',
        },
        take: limit,
        });
    }


    // Get the latest report with user info
    async getLatestReport(): Promise<ReportEntity | null> {
    return this.reportRepo.findOne({
        where: { status: 'Open' },
        order: { createdAt: 'DESC' },
        relations: ['user'],
    });
    }

    // Get the latest pending user for notification in the dashboard UI
    async getLatestPendingUser(): Promise<PendingUsers | null> {
    return await this.PendingUsersRepo.findOne({
      where: { Status: 'Pending' },
      order: { SubmittedAt: 'DESC' },
    });
  }

  //Search User by name
  async searchUsers(query: string): Promise<any[]> {
    const searchPattern = ILike(`%${query}%`);

    const clients = await this.clientRepo.find({
      where: [{ name: searchPattern }, { email: searchPattern }],
      relations: ['trainer', 'nutritionist', 'goals'], // optional: load related entities if needed
    });

    const trainers = await this.trainerRepo.find({
      where: [{ name: searchPattern }, { email: searchPattern }],
      relations: ['clients', 'ratings'],
    });

    const nutritionists = await this.nutritionistRepo.find({
      where: [{ name: searchPattern }, { email: searchPattern }],
      relations: ['clients', 'ratings'],
    });

    const addRole = (arr: any[], role: string) =>
      arr.map((u) => ({ ...u, role }));

    return [
      ...addRole(clients, 'Client'),
      ...addRole(trainers, 'Trainer'),
      ...addRole(nutritionists, 'Nutritionist'),
    ];
  }

}
