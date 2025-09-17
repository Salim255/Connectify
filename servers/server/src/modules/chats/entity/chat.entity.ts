import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Message } from 'src/modules/messages/entity/message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Users participating in the chat
  @ManyToMany(() => User, { eager: true })
  @JoinTable({
    name: 'chat_participants',
    joinColumn: { name: 'chatId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  participants: User[];

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
