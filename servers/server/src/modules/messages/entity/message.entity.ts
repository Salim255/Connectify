import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Chat } from '../../chats/entity/chat.entity';
import { User } from '../../users/entity/user.entity';

export enum MessageStatus {
  SENDING = 'sending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export enum MessageType {
  TEXT = 'text',
  MEDIA = 'media',
  SYSTEM = 'system',
}

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @Column()
  chatId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  senderId: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  mediaUrl?: string;

  @Column({
    type: 'enum',
    enum: ['image', 'video', 'file', 'audio'],
    nullable: true,
  })
  mediaType?: 'image' | 'video' | 'file' | 'audio';

  @ManyToOne(() => Message, { nullable: true })
  @JoinColumn({ name: 'replyToMessageId' })
  replyToMessage?: Message;

  @Column({ type: 'uuid', nullable: true })
  replyToMessageId?: string;

  // Store reactions as JSON object: { emoji: [userId1, userId2] }
  @Column({ type: 'jsonb', default: {} })
  reactions: Record<string, string[]>;

  @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.SENDING })
  status: MessageStatus;

  @Column({ default: false })
  edited: boolean;

  @Column({ default: false })
  deleted: boolean;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
