import { Message } from "../../chat/model/message.model";
import { Profile } from "../../profile/model/profile.model";

export interface Chat {
  id: string;                     // Unique conversation ID
  participants: ChatUser[];       // Users involved in this chat
  messages: Message[];            // Messages in the chat
  title?: string;                 // Optional: conversation title (for groups)
  avatarUrl?: string;             // Optional group avatar
  isGroup?: boolean;              // True if this is a group chat
  unreadCount?: number;           // Unread messages count
  createdAt: Date;                // When chat was created
  updatedAt: Date;                // Last update timestamp
  pinned?: boolean;               // Optional: for pinning favorite chats
  archived?: boolean;             // Optional: if chat is archived
  muted?: boolean;
}

export interface ChatUser {
  profile: Profile;                     // Always link back to the profile
  roles?: ('admin' | 'moderator' | 'member')[];
  isBot?: boolean;
  customStatus?: string;                // e.g. "Typing...", "Out for lunch"
  joinedAt?: Date;                      // When joined this chat (for groups)
  lastActive?: Date;                    // Activity in this chat
}
