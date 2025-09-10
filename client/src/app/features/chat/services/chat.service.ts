import { Injectable } from "@angular/core";
import { Message } from "../model/message.model";

@Injectable({providedIn: 'root'})
export class ChatService{

 placeholderMessages: Message[] = [
  {
    id: 'msg1',
    chatId: 'conv1',
    senderId: 'u1',
    senderName: 'Alice',
    content: 'Hey! 👋 How are you doing today?',
    status: 'read',
    timestamp: new Date('2025-09-10T10:15:00'),
    type: 'text',
    isOwn: false
  },
  {
    id: 'msg2',
    chatId: 'conv1',
    senderId: 'u2',
    senderName: 'You',
    content: 'I’m doing great, just working on the new project 🚀',
    status: 'sent',
    timestamp: new Date('2025-09-10T10:16:30'),
    type: 'text',
    isOwn: true
  },
  {
    id: 'msg3',
    chatId: 'conv1',
    senderId: 'u1',
    senderName: 'Alice',
    content: 'Check out this screenshot from the project.',
    mediaUrl: 'https://placekitten.com/300/200',
    mediaType: 'image',
    status: 'delivered',
    timestamp: new Date('2025-09-10T10:17:05'),
    type: 'media',
    isOwn: false
  },
  {
    id: 'msg4',
    chatId: 'conv1',
    senderId: 'system',
    senderName: 'System',
    content: 'Alice joined the chat.',
    status: 'sent',
    timestamp: new Date('2025-09-10T10:18:00'),
    type: 'system',
    isOwn: false
  },
  {
    id: 'msg5',
    chatId: 'conv1',
    senderId: 'u2',
    senderName: 'You',
    content: 'Got it! Looks great 👍',
    status: 'sending',
    timestamp: new Date('2025-09-10T10:19:00'),
    type: 'text',
    isOwn: true,
    reactions: { '❤️': ['u1'], '👍': ['u1', 'u3'] }
  },
  {
    id: 'msg6',
    chatId: 'conv1',
    senderId: 'u1',
    senderName: 'Alice',
    content: 'Oops, I made a typo in the previous message.',
    status: 'read',
    timestamp: new Date('2025-09-10T10:20:00'),
    type: 'text',
    edited: true,
    isOwn: false
  },

    {
      id: 'msg12',
    chatId: 'conv1',
    senderId: 'u1',
    senderName: 'Alice',
    content: 'Hey! 👋 How are you doing today?',
    status: 'read',
    timestamp: new Date('2025-09-10T10:15:00'),
    type: 'text',
    isOwn: false
  },
  {
    id: 'msg22',
    chatId: 'conv1',
    senderId: 'u2',
    senderName: 'You',
    content: 'I’m doing great, just working on the new project 🚀',
    status: 'sent',
    timestamp: new Date('2025-09-10T10:16:30'),
    type: 'text',
    isOwn: true
  },
  {
    id: 'msg32',
    chatId: 'conv1',
    senderId: 'u1',
    senderName: 'Alice',
    content: 'Check out this screenshot from the project.',
    mediaUrl: 'https://placekitten.com/300/200',
    mediaType: 'image',
    status: 'delivered',
    timestamp: new Date('2025-09-10T10:17:05'),
    type: 'media',
    isOwn: false
  },
  {
    id: 'msg42',
    chatId: 'conv1',
    senderId: 'system',
    senderName: 'System',
    content: 'Alice joined the chat.',
    status: 'sent',
    timestamp: new Date('2025-09-10T10:18:00'),
    type: 'system',
    isOwn: false
  },
  {
    id: 'msg52',
    chatId: 'conv1',
    senderId: 'u2',
    senderName: 'You',
    content: 'Got it! Looks great 👍',
    status: 'sending',
    timestamp: new Date('2025-09-10T10:19:00'),
    type: 'text',
    isOwn: true,
    reactions: { '❤️': ['u1'], '👍': ['u1', 'u3'] }
  },
  {
    id: 'msg62',
    chatId: 'conv1',
    senderId: 'u1',
    senderName: 'Alice',
    content: 'Oops, I made a typo in the previous message.',
    status: 'read',
    timestamp: new Date('2025-09-10T10:20:00'),
    type: 'text',
    edited: true,
    isOwn: false
  }
  ];
}
