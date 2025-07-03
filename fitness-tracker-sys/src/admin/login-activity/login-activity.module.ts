import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginActivityController } from './login-activity.controller';
import { LoginActivityService } from './login-activity.service';
import { LoginActivity } from '../Entity/login-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginActivity])],
  controllers: [LoginActivityController],
  providers: [LoginActivityService],
})
export class LoginActivityModule {}
