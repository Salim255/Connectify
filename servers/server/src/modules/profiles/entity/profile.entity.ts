import { User } from 'src/modules/users/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProfileConnectionStatus, UserGender } from '../dto/profiles.dto';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // This creates a "userId" column in the DB
  user: User;

  // ✅ Exposed userId FK column (will appear in JSON responses)
  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  name: string;

  // Better as birthDate, but keeping "age" as Date since you said so
  @Column({ type: 'date' })
  age: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'non-binary', 'other'],
  })
  gender: UserGender;

  @Column()
  avatarUrl: string;

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
  status?: ProfileConnectionStatus;

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
