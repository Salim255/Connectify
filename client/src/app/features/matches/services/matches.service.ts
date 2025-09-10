import { Injectable } from "@angular/core";
import { Match } from "../model/match.model";

@Injectable({providedIn: 'root'})

export class MatchesService {
  MATCHES_PLACEHOLDER: Match[] = [
  {
    id: 'match-1',
    user: {
      id: 'u1',
      name: 'Emma Johnson',
      age: 26,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      status: 'online'
    },
    createdAt: new Date('2025-09-01T12:00:00Z'),
    updatedAt: new Date('2025-09-01T12:00:00Z'),
    status: 'pending',
    isNew: true,
    compatibilityScore: 88,
    commonInterests: ['hiking', 'photography']
  },
  {
    id: 'match-2',
    user: {
      id: 'u2',
      name: 'Liam Smith',
      age: 29,
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      status: 'offline'
    },
    createdAt: new Date('2025-09-03T18:30:00Z'),
    updatedAt: new Date('2025-09-04T09:00:00Z'),
    status: 'pending',
    compatibilityScore: 72,
    commonInterests: ['cooking', 'travel']
  },
  {
    id: 'match-3',
    user: {
      id: 'u3',
      name: 'Sophia Davis',
      age: 24,
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      status: 'away'
    },
    createdAt: new Date('2025-09-05T14:20:00Z'),
    updatedAt: new Date('2025-09-05T14:25:00Z'),
    status: 'pending',
    isNew: true,
    compatibilityScore: 95,
    commonInterests: ['yoga', 'art', 'tech']
  },
  {
    id: 'match-4',
    user: {
      id: 'u4',
      name: 'Noah Wilson',
      age: 31,
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
      status: 'online'
    },
    createdAt: new Date('2025-09-06T16:00:00Z'),
    updatedAt: new Date('2025-09-06T16:10:00Z'),
    status: 'pending',
    compatibilityScore: 67,
    commonInterests: ['sports', 'music']
  }
];
}
