import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Chat } from '../../chats/entity/chat.entity';
import { Profile } from '../../profiles/entity/profile.entity';

export enum ChatUserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

@Entity('chat_users')
export class ChatUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat, (chat) => chat.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Column()
  chatId: string;

  // { eager: true } means that the relation will be loaded automatically every time you
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
