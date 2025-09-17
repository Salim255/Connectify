import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';
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
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChatEntity, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: ChatEntity;

  @Column()
  chatId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  senderId: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  mediaUrl?: string;

  @Column({ type: 'enum', enum: ['image', 'video', 'file', 'audio'], nullable: true })
  mediaType?: 'image' | 'video' | 'file' | 'audio';

  @ManyToOne(() => MessageEntity, { nullable: true })
  @JoinColumn({ name: 'replyToMessageId' })
  replyToMessage?: MessageEntity;

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
