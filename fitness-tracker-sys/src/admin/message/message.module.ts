import {Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';


import { JwtModule } from '@nestjs/jwt';
import { Client } from '../Entity/Client.entity';
import { Trainer } from '../Entity/Trainer.entity';
import { Nutritionist } from '../Entity/Nutritionist.entity';



@Module({
    imports: [
    TypeOrmModule.forFeature([Message,Client,Trainer,Nutritionist]),

  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
