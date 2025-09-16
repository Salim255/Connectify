import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID is better for profiles in dating apps

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'non-binary', 'other'],
    nullable: false,
  })
  gender: 'male' | 'female' | 'non-binary' | 'other';

  @Column({ nullable: false })
  avatarUrl?: string;

  // JSON columns for flexible structures
  @Column('text', { array: true, default: [] })
  photos: string[];

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'jsonb', nullable: true })
  location?: {
    city?: string;
    country?: string;
    coordinates?: { lat: number; lng: number };
  };

  @Column('text', { array: true, default: [] })
  interests?: string[];

  @Column({ type: 'jsonb', default: [] })
  prompts?: { question: string; answer: string }[];

  @Column({ type: 'jsonb', nullable: true })
  lifestyle?: {
    smoking?: boolean;
    drinking?: boolean;
    diet?: 'vegan' | 'vegetarian' | 'omnivore' | 'other';
    pets?: string[];
  };

  @Column({ type: 'int', nullable: true })
  compatibilityScore?: number;

  @Column({ default: false })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: ['online', 'offline', 'away', 'busy', 'invisible'],
    default: 'offline',
  })
  status: 'online' | 'offline' | 'away' | 'busy' | 'invisible';

  @Column({ type: 'timestamp', nullable: true })
  lastSeen?: Date;

  @Column({ type: 'jsonb', nullable: true })
  preferences?: {
    theme?: 'light' | 'dark';
    discovery?: {
      minAge?: number;
      maxAge?: number;
      distanceKm?: number;
      interestedIn?: ('male' | 'female' | 'non-binary' | 'any')[];
    };
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
