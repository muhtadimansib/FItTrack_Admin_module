// src/exercise/dto/create-exercise.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  calories: number;

  @IsString()
  level: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  muscleGroup?: string;

  @IsOptional()
  @IsString()
  equipment?: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;
}
