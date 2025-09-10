import { Message } from "../../chat/model/message.model";
import { Profile } from "../../profile/model/profile.model";

export interface Chat {
  id: string;                    // Unique conversation ID
  participants: ChatUser[];       // Users involved in this chat
  messages: Message[];            // Messages in the chat
  otherProfile?: Profile;         // Profile of the non-host user (optional for 1:1 chats)
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
  id: string;                           // Unique user ID
  name: string;                         // Display name
  username?: string;                     // Optional username/handle
  email?: string;                        // Optional email
  avatarUrl?: string;                    // Profile picture URL
  age?: number;
  status?: 'online' | 'offline' | 'away' | 'busy' | 'invisible'; // Presence status
  lastSeen?: Date;                       // Last time user was active
  roles?: ('admin' | 'moderator' | 'member')[]; // Roles in group chats
  isBot?: boolean;                       // Flag for bot users
  createdAt?: Date;                      // Account creation date
  updatedAt?: Date;                      // Last profile update
  customStatus?: string;                 // Optional short user-defined status
}
