import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Request } from 'src/requests/entities/request.entity';

export enum UserRole {
  USER = 'user',
  REVIEWER = 'reviewer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  userRole: UserRole;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamptz', { nullable: true })
  lastLogin: Date;

  @OneToMany(() => Request, (request) => request.createdBy)
  requests: Request[];
}
