import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../Entity/Client.entity';
import { Trainer } from '../Entity/Trainer.entity';
import { Nutritionist } from '../Entity/Nutritionist.entity';
import { PendingUsers } from '../PendingUsers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,

    @InjectRepository(Trainer)
    private trainerRepo: Repository<Trainer>,

    @InjectRepository(Nutritionist)
    private nutritionistRepo: Repository<Nutritionist>,

    @InjectRepository(PendingUsers)
    private pendingUsersRepo: Repository<PendingUsers>,
  ) {}

  async getAllClients(): Promise<Client[]> {
    return await this.clientRepo.find({
      relations: ['trainer', 'nutritionist', 'goals'],
    });
  }

  async getAllTrainers(): Promise<Trainer[]> {
    return await this.trainerRepo.find({
      relations: ['clients', 'ratings'],
    });
  }

  async getAllNutritionists(): Promise<Nutritionist[]> {
    return await this.nutritionistRepo.find({
      relations: ['clients', 'ratings'],
    });
  }

  async getAllPendingUsers(): Promise<PendingUsers[]> {
    return await this.pendingUsersRepo.find({
      where: { Status: 'Pending' },
    });
  }
}

