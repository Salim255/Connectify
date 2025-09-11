import { Injectable } from "@angular/core";
import { Message } from "../model/message.model";

@Injectable({providedIn: 'root'})
export class ChatService{

 placeholderMessages: Message[] = [
  {
    id: 'msg1',
    chatId: 'conv1',
    senderId: 'u1',
    content: 'Hey! 👋 How are you doing today?',
    status: 'read',
    createdAt: new Date('2025-09-10T10:15:00'),
    type: 'text',
    isOwn: false
  },
  {
    id: 'msg2',
    chatId: 'conv1',
    senderId: 'u2',
    content: 'I’m doing great, just working on the new project 🚀',
    status: 'sent',
    createdAt: new Date('2025-09-10T10:16:30'),
    type: 'text',
    isOwn: true
  },
  {
    id: 'msg3',
    chatId: 'conv1',
    senderId: 'u1',
    content: 'Check out this screenshot from the project.',
    mediaUrl: 'https://placekitten.com/300/200',
    mediaType: 'image',
    status: 'delivered',
    createdAt: new Date('2025-09-10T10:17:05'),
    type: 'media',
    isOwn: false
  },
  {
    id: 'msg4',
    chatId: 'conv1',
    senderId: 'system',
    content: 'Alice joined the chat.',
    status: 'sent',
    createdAt: new Date('2025-09-10T10:18:00'),
    type: 'system',
    isOwn: false
  },
  {
    id: 'msg5',
    chatId: 'conv1',
    senderId: 'u2',
    content: 'Got it! Looks great 👍',
    status: 'sending',
    createdAt: new Date('2025-09-10T10:19:00'),
    type: 'text',
    isOwn: true,
    reactions: { '❤️': ['u1'], '👍': ['u1', 'u3'] }
  },
  {
    id: 'msg6',
    chatId: 'conv1',
    senderId: 'u1',
    content: 'Oops, I made a typo in the previous message.',
    status: 'read',
    createdAt: new Date('2025-09-10T10:20:00'),
    type: 'text',
    edited: true,
    isOwn: false
  },

    {
      id: 'msg12',
    chatId: 'conv1',
    senderId: 'u1',
    content: 'Hey! 👋 How are you doing today?',
    status: 'read',
    createdAt: new Date('2025-09-10T10:15:00'),
    type: 'text',
    isOwn: false
  },
  {
    id: 'msg22',
    chatId: 'conv1',
    senderId: 'u2',
    content: 'I’m doing great, just working on the new project 🚀',
    status: 'sent',
    createdAt: new Date('2025-09-10T10:16:30'),
    type: 'text',
    isOwn: true
  },
  {
    id: 'msg32',
    chatId: 'conv1',
    senderId: 'u1',
    content: 'Check out this screenshot from the project.',
    mediaUrl: 'https://placekitten.com/300/200',
    mediaType: 'image',
    status: 'delivered',
    createdAt: new Date('2025-09-10T10:17:05'),
    type: 'media',
    isOwn: false
  },
  {
    id: 'msg42',
    chatId: 'conv1',
    senderId: 'system',
    content: 'Alice joined the chat.',
    status: 'sent',
    createdAt: new Date('2025-09-10T10:18:00'),
    type: 'system',
    isOwn: false
  },
  {
    id: 'msg52',
    chatId: 'conv1',
    senderId: 'u2',
    content: 'Got it! Looks great 👍',
    status: 'sending',
    createdAt: new Date('2025-09-10T10:19:00'),
    type: 'text',
    isOwn: true,
    reactions: { '❤️': ['u1'], '👍': ['u1', 'u3'] }
  },
  {
    id: 'msg62',
    chatId: 'conv1',
    senderId: 'u1',
    content: 'Oops, I made a typo in the previous message.',
    status: 'read',
    createdAt: new Date('2025-09-10T10:20:00'),
    type: 'text',
    edited: true,
    isOwn: false
  }
  ];
}
