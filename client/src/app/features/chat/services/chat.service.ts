import { Injectable } from "@angular/core";
import { Message } from "../model/message.model";

@Injectable({providedIn: 'root'})
export class ChatService{

 placeholderMessages: Message[] = [
  {
    id: 'msg1',
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
    conversationId: 'conv1',
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
