import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UsersInfo } from './UsersInfo.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  subject: string;

  @Column('text')
  message: string;

  @Column({ default: 'Open' })
  status: 'Open' | 'Resolved' | 'In Progress';

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UsersInfo, { eager: true })
  user: UsersInfo;
}
