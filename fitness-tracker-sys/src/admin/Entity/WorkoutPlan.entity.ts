import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Exercise } from './Exercise.entity';

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  difficultyLevel: string;  // e.g., 'Beginner', 'Intermediate', 'Advanced'

  @Column({ type: 'int' })
  durationMinutes: number;

  @ManyToMany(() => Exercise, (exercise) => exercise.workoutPlans, {
    cascade: true,
  })
  @JoinTable()  // this decorator is needed on one side of the many-to-many relation
  exercises: Exercise[];
}
