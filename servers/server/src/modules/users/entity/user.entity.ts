import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../dto/users.dto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    enum: ['user', 'admin', 'support'],
    default: 'user',
  })
  role: UserRole;
}
