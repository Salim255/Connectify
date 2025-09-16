import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
  role: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
