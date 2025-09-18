import { User } from '../../../modules/users/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Unique,
  JoinColumn,
} from 'typeorm';

export enum MatchStatus {
  PENDING = 'pending', // maybe one-sided like
  MATCHED = 'matched', // mutual like
  BLOCKED = 'blocked', // one user blocked the other
  UNMATCHED = 'unmatched', // match ended
}

@Entity('matches')
@Unique(['toUser', 'fromUser']) // prevent duplicate matches between same pair
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Eager: true: Automatically load this relation whenever you load the entity
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @Column()
  toUserId: string; // exposes the UUID directly in the entity

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'toUserId' })
  toUser: User;

  @Column()
  fromUserId: string; // exposes the UUID directly in the entity

  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.PENDING,
  })
  status: MatchStatus;

  @Column({ type: 'boolean', default: false })
  isFavorite: boolean; // allow starring someone

  @Column({ type: 'boolean', default: false })
  isHidden: boolean; // hide from list without deleting

  @Column({ default: null })
  matchedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
