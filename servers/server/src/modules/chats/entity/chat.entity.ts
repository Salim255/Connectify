import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from 'src/modules/messages/entity/message.entity';
import { ChatUser } from 'src/modules/chat-users/entity/chat-user.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Users participating in the chat
  // A chat can have many ChatUsers (participants)
  @OneToMany(() => ChatUser, (chatUser) => chatUser.chat, { eager: true })
  participants: ChatUser[];

  // Messages in this chat
  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
    eager: true,
  })
  messages: Message[];

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl?: string;

  @Column({ default: false })
  isGroup: boolean;

  @Column({ default: 0 })
  unreadCount: number;

  @Column({ default: false })
  pinned: boolean;

  @Column({ default: false })
  archived: boolean;

  @Column({ default: false })
  muted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
