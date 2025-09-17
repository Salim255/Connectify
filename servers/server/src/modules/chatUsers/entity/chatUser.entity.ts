import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ChatEntity } from '../../chats/entity/chat.entity';
import { Profile } from '../../profiles/entity/profile.entity';

export enum ChatUserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

@Entity('chat_users')
export class ChatUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChatEntity, (chat) => chat.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatId' })
  chat: ChatEntity;

  @Column()
  chatId: string;

  @ManyToOne(() => Profile, { eager: true })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @Column()
  profileId: string;

  @Column({ type: 'simple-array', default: 'member' })
  roles: ChatUserRole[];

  @Column({ default: false })
  isBot: boolean;

  @Column({ type: 'varchar', nullable: true })
  customStatus?: string;

  @CreateDateColumn()
  joinedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastActive?: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
