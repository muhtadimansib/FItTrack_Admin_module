// src/exercise/exercise.controller.ts
import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from '../DTO/exercise.dto';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly service: ExerciseService) { }

  @Post('create')
  create(@Body() dto: CreateExerciseDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }


  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Get('stats')
  getStats() {
    return this.service.getStats();
  }
}
