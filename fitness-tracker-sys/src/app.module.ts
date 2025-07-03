import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendingUsers } from './admin/PendingUsers.entity';
import { Users } from './admin/users.entity';
import { AuthModule } from './auth/auth.module';
import { Client } from './admin/Entity/Client.entity';
import { Nutritionist } from './admin/Entity/Nutritionist.entity';
import { Trainer } from './admin/Entity/Trainer.entity';
import { NutritionistRating } from './admin/Entity/NutritionistRating.entity';
import { TrainerRating } from './admin/Entity/TrainerRating.entity';
import { Message } from './admin/message/message.entity';
import { ClientGoal } from './admin/Entity/Client-goal.entity';
import { DailyActivity } from './admin/Entity/Daily-activity-logs.entity';
import { WorkoutDietLog } from './admin/Entity/Workout-diet-logs.enitity';
import { Exercise } from './admin/Entity/Exercise.entity';
import { WorkoutPlan } from './admin/Entity/WorkoutPlan.entity';
import { NutritionEntry } from './admin/Entity/NutritionEntry.entity';
import { UsersInfo } from './admin/Entity/UsersInfo.entity';
import { Report } from './admin/Entity/Report.entity';
import { ClientMealPlan } from './admin/Entity/ClientMealPlan.entity';
import { LoginActivity } from './admin/Entity/login-activity.entity';
import { ExerciseModule } from './admin/exercise/exercise.module';




@Module({
  imports: [AdminModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'FitnessTrackerSys',
    entities: [
      PendingUsers,
      Users,
      Client,
      Nutritionist,
      Trainer,
      NutritionistRating,
      TrainerRating,
      Message,
      ClientGoal,
      DailyActivity,
      WorkoutDietLog,
      Exercise,
      WorkoutPlan,
      NutritionEntry,
      UsersInfo,
      Report,
      ClientMealPlan,
      LoginActivity
      
    ],
    synchronize: true,
  }),AuthModule, ExerciseModule,],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
