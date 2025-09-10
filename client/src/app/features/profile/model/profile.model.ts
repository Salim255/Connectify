import { ChatUser } from "../../chats/model/chat.model";

export interface Profile {
  user: ChatUser;                       // always include ChatUser block                          // required for browsing/dating
  bio?: string;                          // personal description
  photos: string[];                      // gallery
  location?: {
    city?: string;
    country?: string;
    coordinates?: { lat: number; lng: number };
  };
  interests?: string[];                  // hobbies or tags
  prompts?: { question: string; answer: string }[];
  lifestyle?: {
    smoking?: boolean;
    drinking?: boolean;
    diet?: 'vegan' | 'vegetarian' | 'omnivore' | 'other';
    pets?: string[];
  };
  compatibilityScore?: number;           // optional % match
  verified?: boolean;                    // account verification badge
  joinedAt: Date;                        // when user joined
  updatedAt: Date;                        // last profile update
  preferences?: {
    notificationsMuted?: boolean;
    theme?: 'light' | 'dark';
    discovery?: {                        // browse/match filters
      minAge?: number;
      maxAge?: number;
      distanceKm?: number;
      interestedIn?: ('male' | 'female' | 'non-binary' | 'any')[];
    };
  };
}
