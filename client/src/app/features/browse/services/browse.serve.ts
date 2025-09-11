import { Injectable } from "@angular/core";
import { ChatUser } from "../../chats/model/chats.model";
import { Profile } from "../../profile/model/profile.model";

@Injectable({providedIn: 'root'})

export class BrowseService {

  placeholderChatUsers: ChatUser[] = [
    {
      id: 'u1',
      name: 'Alice Johnson',
      username: 'alicej',
      email: 'alice@example.com',
      avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      status: 'online',
      lastSeen: new Date(),
      roles: ['member'],
      isBot: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      customStatus: 'Loves coffee ☕'
    },
    {
      id: 'u2',
      name: 'Bob Smith',
      username: 'bob_s',
      email: 'bob@example.com',
      avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
      status: 'away',
      lastSeen: new Date(),
      roles: ['member'],
      isBot: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      customStatus: 'Gaming tonight 🎮'
    },
    {
      id: 'u3',
      name: 'Carla Davis',
      username: 'carlaD',
      email: 'carla@example.com',
      avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
      status: 'offline',
      lastSeen: new Date(),
      roles: ['member'],
      isBot: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      customStatus: 'Travelling ✈️'
    },
  ];

  placeholderBrowseProfiles: Profile[] = [
    {
      id: 1,
      user: this.placeholderChatUsers[0],
      bio: 'Software engineer, coffee lover, and dog dad.',
      photos: [
        'https://randomuser.me/api/portraits/women/1.jpg',
        'https://randomuser.me/api/portraits/women/1.jpg'
      ],
      location: { city: 'San Francisco', country: 'USA', coordinates: { lat: 37.7749, lng: -122.4194 } },
      interests: ['Coding', 'Hiking', 'Gaming'],
      prompts: [{ question: 'Favorite food?', answer: 'Pizza 🍕' }],
      lifestyle: { smoking: false, drinking: true, diet: 'omnivore', pets: ['dog'] },
      compatibilityScore: 87,
      verified: true,
      joinedAt: new Date(),
      updatedAt: new Date(),
      preferences: { notificationsMuted: false, theme: 'light', discovery: { minAge: 20, maxAge: 35, distanceKm: 50, interestedIn: ['female'] } }
    },
    {
      id: 2,
      user: this.placeholderChatUsers[1],
      bio: 'Designer who loves music and travel.',
      photos: [
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg'
      ],
      location: { city: 'New York', country: 'USA' },
      interests: ['Design', 'Music', 'Travel'],
      prompts: [{ question: 'Dream vacation?', answer: 'Bali 🏝️' }],
      lifestyle: { smoking: false, drinking: false, diet: 'vegetarian', pets: ['cat'] },
      compatibilityScore: 92,
      verified: true,
      joinedAt: new Date(),
      updatedAt: new Date(),
      preferences: { notificationsMuted: false, theme: 'dark', discovery: { minAge: 22, maxAge: 40, distanceKm: 100, interestedIn: ['female', 'non-binary'] } }
    },
    {
      id: 3,
      user: this.placeholderChatUsers[2],
      bio: 'Photographer and coffee addict.',
      photos: [
        'https://randomuser.me/api/portraits/women/3.jpg',
        'https://randomuser.me/api/portraits/women/3.jpg'
      ],
      location: { city: 'Los Angeles', country: 'USA' },
      interests: ['Photography', 'Coffee', 'Yoga'],
      prompts: [{ question: 'Favorite activity?', answer: 'Morning yoga 🧘‍♀️' }],
      lifestyle: { smoking: false, drinking: true, diet: 'vegan', pets: [] },
      compatibilityScore: 79,
      verified: false,
      joinedAt: new Date(),
      updatedAt: new Date(),
      preferences: { notificationsMuted: true, theme: 'light', discovery: { minAge: 21, maxAge: 38, distanceKm: 30, interestedIn: ['male'] } }
    }
  ];
}
