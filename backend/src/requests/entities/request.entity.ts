import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

export enum RequestType {
  VACATION = 'vacation',
  PURCHASE = 'purchase',
  GENERIC = 'generic',
}

export enum RequestStatus {
  CREATED = 'created',
  IN_REVIEW = 'in-review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: RequestType, default: RequestType.GENERIC })
  type: RequestType;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.CREATED })
  status: RequestStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.requests, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: true,
  })
  createdBy: User;
}
