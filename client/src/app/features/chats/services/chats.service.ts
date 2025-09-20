import { Injectable } from "@angular/core";
import { Chats } from "../model/chats.model";
import { ProfileService } from "../../profile/services/profile.service";
import { Profile } from "../../profile/model/profile.model";
import { ChatsHttpService } from "./chats-http.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Chat } from "../../chat/model/chat.model";

@Injectable({providedIn: 'root'})
export class ChatsService {
  profiles: Profile [];
  // Placeholder chats
 CHATS_PLACEHOLDER: Chats;

 matchesSubject = new BehaviorSubject< Chat[] | null>(null);

 constructor(
  private chatsHttpService: ChatsHttpService,
  private profileService: ProfileService,
 ){
    this.profiles = this.profileService.PROFILES_PLACEHOLDER;
    this.CHATS_PLACEHOLDER =
       [
        {
          id: 'c1',
          participants: [
            { profile: this.profiles[0], roles: ['member'], lastActive: new Date() },
          ],
          messages: [
            {
              id: 'm1',
              chatId: 'c1',
              senderId: 'p1',
              content: 'Hey Bob! How’s your day?',
              status: 'read',
              createdAt: new Date(),
              type: 'text',
              isOwn: true,
            },
            {
              id: 'm2',
              chatId: 'c1',
              senderId: 'p2',
              content: 'Doing great, thanks Alice! How about you?',
              status: 'delivered',
              createdAt: new Date(),
              type: 'text',
            },
          ],
          unreadCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          updatedAt: new Date(),
        },
        {
          id: 'c2',
          participants: [
            { profile: this.profiles[1], roles: ['member'], lastActive: new Date() },
          ],
          messages: [
            {
              id: 'm3',
              chatId: 'c2',
              senderId: 'p3',
              content: 'Want to grab coffee tomorrow?',
              status: 'sent',
              createdAt: new Date(),
              type: 'text',
            },
          ],
          unreadCount: 1,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
          updatedAt: new Date(),
          pinned: true,
        },
        {
          id: 'c3',
          participants: [
            { profile: this.profiles[2], roles: ['admin'], lastActive: new Date() },

          ],
          messages: [
            {
              id: 'm4',
              chatId: 'c3',
              senderId: 'p1',
              content: 'Welcome to our group chat 🎉',
              status: 'read',
              createdAt: new Date(),
              type: 'system',
            },
          ],
          title: 'Weekend Plans',
          avatarUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
          isGroup: true,
          unreadCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
          updatedAt: new Date(),
        },
      ]
  }

  get getUserChats$(): Observable<Chat[] | null>{
    return this.matchesSubject.asObservable();
  }
}
