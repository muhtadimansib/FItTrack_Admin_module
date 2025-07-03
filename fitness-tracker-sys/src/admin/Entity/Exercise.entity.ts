// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
// import { WorkoutPlan } from './WorkoutPlan.entity';

// @Entity()
// export class Exercise {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   name: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column()
//   muscleGroup: string;  // e.g., 'Chest', 'Back', 'Legs'

//   @Column({ nullable: true })
//   equipment: string;  // e.g., 'Dumbbell', 'Barbell', 'None'

//   @Column({ nullable: true })
//   videoUrl: string;  // optional link to demo video

//   @CreateDateColumn()
//     createdAt: Date;

//   @ManyToMany(() => WorkoutPlan, (workoutPlan) => workoutPlan.exercises)
//   workoutPlans: WorkoutPlan[];
// }










// src/exercise/entities/exercise.entity.ts
// src/exercise/entities/exercise.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { WorkoutPlan } from './WorkoutPlan.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: 'int' })
  duration: number;

  @Column({ nullable: true, type: 'int' })
  calories: number;

  @Column({ nullable: true })
  level: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  muscleGroup: string;

  @Column({ nullable: true })
  equipment: string;

  @Column({ nullable: true })
  videoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => WorkoutPlan, (workoutPlan) => workoutPlan.exercises)
  @JoinTable()
  workoutPlans: WorkoutPlan[];
}
