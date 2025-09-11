export interface Profile {
  id: string;                          // unique profile ID
  name: string;                        // display name
  age: number;                         // required for dating/browse
  gender?: 'male' | 'female' | 'non-binary' | 'other';
  avatarUrl?: string;                  // main photo
  photos: string[];                    // gallery
  bio?: string;                        // personal description

  location?: {
    city?: string;
    country?: string;
    coordinates?: { lat: number; lng: number };
  };

  interests?: string[];                // hobbies/tags
  prompts?: { question: string; answer: string }[];

  lifestyle?: {
    smoking?: boolean;
    drinking?: boolean;
    diet?: 'vegan' | 'vegetarian' | 'omnivore' | 'other';
    pets?: string[];
  };

  compatibilityScore?: number;         // match %
  verified?: boolean;                  // blue check
  status?: 'online' | 'offline' | 'away' | 'busy' | 'invisible';
  lastSeen?: Date;                     // presence

  preferences?: {
    theme?: 'light' | 'dark';
    discovery?: {
      minAge?: number;
      maxAge?: number;
      distanceKm?: number;
      interestedIn?: ('male' | 'female' | 'non-binary' | 'any')[];
    };
  };

  createdAt: Date;
  updatedAt: Date;
}
