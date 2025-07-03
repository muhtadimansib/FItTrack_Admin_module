import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Client } from '../Entity/Client.entity';
import { Trainer } from '../Entity/Trainer.entity';
import { Nutritionist } from '../Entity/Nutritionist.entity';
import { PendingUsers } from '../PendingUsers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Trainer, Nutritionist, PendingUsers])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

