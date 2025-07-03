// src/exercise/exercise.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Exercise } from '../Entity/Exercise.entity';
import { CreateExerciseDto } from '../DTO/exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepo: Repository<Exercise>,
  ) {}

  async create(dto: CreateExerciseDto) {
    const exercise = this.exerciseRepo.create(dto);
    return this.exerciseRepo.save(exercise);
  }

  async findAll() {
    return this.exerciseRepo.find();
  }

  async findOne(id: number) {
    const ex = await this.exerciseRepo.findOneBy({ id });
    if (!ex) throw new NotFoundException('Exercise not found');
    return ex;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.exerciseRepo.delete(id);
    return { message: 'Deleted successfully' };
  }

async findByName(name: string): Promise<Exercise[]> {
  return this.exerciseRepo.find({
    where: { name: ILike(`%${name}%`) },
  });
}

  // src/exercise/exercise.service.ts
async getStats() {
  const total = await this.exerciseRepo.count();

  const { avgDuration, avgCalories } = await this.exerciseRepo
    .createQueryBuilder('exercise')
    .select('AVG(exercise.duration)', 'avgDuration')
    .addSelect('AVG(exercise.calories)', 'avgCalories')
    .getRawOne();

  return {
    totalExercises: total,
    averageDuration: Math.round(Number(avgDuration) || 0),
    averageCalories: Math.round(Number(avgCalories) || 0),
  };
}

}
