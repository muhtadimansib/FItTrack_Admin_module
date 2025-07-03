import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ClientMealPlan } from './ClientMealPlan.entity';

@Entity()
export class NutritionEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;  // Assuming you track nutrition per user

  @Column()
  foodName: string;

  @Column('int')
  calories: number;

  @Column('float', { nullable: true })
  proteinGrams: number;

  @Column('float', { nullable: true })
  carbsGrams: number;

  @Column('float', { nullable: true })
  fatGrams: number;

  @CreateDateColumn()
  createdAt: Date;

}
