import { ChatUser } from "../../chats/model/chat.model";
import { Profile } from "../../profile/model/profile.model";

export interface Match {
  id: string;                        // Unique match ID
  user: ChatUser;                    // The matched user
  createdAt: Date;                   // When the match was created
  updatedAt: Date;                   // Last update (e.g., status change)
  otherProfile?: Profile;
  status: 'pending' | 'active' | 'unmatched' | 'blocked';
  // pending: just matched but no messages yet
  // active: currently chatting
  // unmatched: one or both unmatched
  // blocked: blocked by one user

  isNew?: boolean;                   // For highlighting new matches
  lastInteraction?: Date;            // Last time users interacted (message, like, etc.)
  compatibilityScore?: number;       // Optional: % or score between users
  commonInterests?: string[];        // Shared hobbies/tags
  location?: string;                 // Optional: nearby city or distance
  initiatedBy?: string;              // Who initiated the match (userId)
  notificationsMuted?: boolean;      // If user muted notifications for this match
}
