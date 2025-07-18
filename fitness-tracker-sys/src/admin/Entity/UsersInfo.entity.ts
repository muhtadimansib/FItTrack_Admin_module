import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UsersInfo {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column({ length: 255 })
  UName: string;

  @Column({ length: 255 })
  Email: string;

  @Column({ length: 255 })
  Password: string;

  @Column({ type: 'enum', enum: ['Trainer', 'Nutritionist'] })
  Role: 'Trainer' | 'Nutritionist';

  @Column({ length: 255, nullable: true })
  Certification: string;

  @Column({ length: 255, nullable: true })
  Specialization: string;

  @Column({ type: 'int', nullable: true })
  ExperienceYears: number;

  @Column({ type: 'text', nullable: true })
  Bio: string;

  @CreateDateColumn()
  SubmittedAt: Date;

  @CreateDateColumn()
  ApprovedAt: Date;

  @Column({ type: 'text', nullable: true })
  ProfileImageUrl: string

}
