import { Injectable } from "@angular/core";
import { Message } from "../model/message.model";
import { Profile } from "../../profile/model/profile.model";
import { ProfileService } from "../../profile/services/profile.service";
import { Observable, of } from "rxjs";
import { ChatHttpService } from "./chat-http.service";
import { AccountService } from "../../account/services/account.service";
import { Chat } from "../model/chat.model";

@Injectable({providedIn: 'root'})
export class ChatService{
  activeChat: Chat = new Chat(null);
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

  partnerProfile: Profile;

  constructor(
    private chatHttpService: ChatHttpService,
    private profileService:  ProfileService,
    private accountService: AccountService,
  ){
    this.partnerProfile = this.profileService.PROFILES_PLACEHOLDER[0];
  }

  fetchChatById(chatId: string): Observable<any>{
    return this.chatHttpService.fetchChatByChatId(chatId);
  }

  fetchChatByProfilesIds(receiverProfileId: string ){
    const hostProfile = this.accountService.accountProfile;
    if(!hostProfile) throw of(null);
    //`547f0bd1-d544-4fa1-ac96-639fd40eb94a`
    return this.chatHttpService.fetchChatByProfilesIds( hostProfile.id, receiverProfileId );
  }

  createChat(data: any){
    return this.chatHttpService.createChat(data);
  }

  sendMessage(data: any){
    return this.chatHttpService.sendMessage(data);
  }
}
