import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('clients')
  getAllClients() {
    return this.usersService.getAllClients();
  }

  @Get('trainers')
  getAllTrainers() {
    return this.usersService.getAllTrainers();
  }

  @Get('nutritionists')
  getAllNutritionists() {
    return this.usersService.getAllNutritionists();
  }

  @Get('pending')
  getAllPendingUsers() {
    return this.usersService.getAllPendingUsers();
  }
}
