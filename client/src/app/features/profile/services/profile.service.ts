import { Injectable } from "@angular/core";
import { Profile } from "../model/profile.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ProfileHttpService, ProfileResponse } from "./profile-http.service";
import { Router } from "@angular/router";
import { AccountService } from "../../account/services/account.service";

@Injectable({providedIn: 'root'})
export class ProfileService {
  profileSubject = new BehaviorSubject<Profile | null>(null);
  private profileLoadedSubject = new BehaviorSubject<boolean>(false);

  isLoadedProfile$ = this.profileLoadedSubject.asObservable();

  constructor(
    private accountService: AccountService,
    private profileHttpService: ProfileHttpService,
  ){}

  PROFILES_PLACEHOLDER: Profile[] = [
      {
        id: 'p1',
        name: 'Alice Johnson',
        userId: '1',
        age: 25,
        gender: 'female',
        avatarUrl: 'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg',
        photos: ['https://randomuser.me/api/portraits/women/1.jpg', 'https://randomuser.me/api/portraits/women/11.jpg'],
        bio: 'Loves hiking and outdoor adventures.',
        location: { city: 'New York', country: 'USA' },
        interests: ['hiking', 'yoga', 'photography'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore', pets: ['dog'] },
        compatibilityScore: 85,
        verified: true,
        status: 'online',
        lastSeen: new Date(),
        preferences: { theme: 'light', discovery: { minAge: 22, maxAge: 30, distanceKm: 50, interestedIn: ['male'] } },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p2',
        userId: '1',
        name: 'Bob Smith',
        age: 28,
        gender: 'male',
        avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        photos: ['https://randomuser.me/api/portraits/men/2.jpg'],
        bio: 'Coffee enthusiast and book lover.',
        location: { city: 'Chicago', country: 'USA' },
        interests: ['coffee', 'reading', 'gaming'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore' },
        compatibilityScore: 90,
        verified: false,
        status: 'away',
        lastSeen: new Date(),
        preferences: { theme: 'dark', discovery: { minAge: 25, maxAge: 35, distanceKm: 100, interestedIn: ['female'] } },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p3',
        userId: '1',
        name: 'Clara Lee',
        age: 23,
        gender: 'female',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
        photos: ['https://randomuser.me/api/portraits/women/3.jpg'],
        bio: 'Passionate about music and travel.',
        location: { city: 'Los Angeles', country: 'USA' },
        interests: ['music', 'travel', 'art'],
        lifestyle: { smoking: false, drinking: false, diet: 'vegetarian', pets: [] },
        compatibilityScore: 78,
        verified: true,
        status: 'online',
        lastSeen: new Date(),
        preferences: { theme: 'light' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p4',
            userId: '1',
        name: 'David Kim',
        age: 30,
        gender: 'male',
        avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
        photos: ['https://randomuser.me/api/portraits/men/4.jpg'],
        bio: 'Fitness coach and foodie.',
        location: { city: 'San Francisco', country: 'USA' },
        interests: ['fitness', 'food', 'travel'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore', pets: ['cat'] },
        compatibilityScore: 82,
        verified: false,
        status: 'busy',
        lastSeen: new Date(),
        preferences: { theme: 'dark' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p5',
            userId: '1',
        name: 'Emma Wilson',
        age: 27,
        gender: 'female',
        avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
        photos: ['https://randomuser.me/api/portraits/women/5.jpg'],
        bio: 'Designer and coffee addict.',
        location: { city: 'Seattle', country: 'USA' },
        interests: ['design', 'coffee', 'photography'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore', pets: [] },
        compatibilityScore: 88,
        verified: true,
        status: 'offline',
        lastSeen: new Date(),
        preferences: { theme: 'light' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p6',
            userId: '1',
        name: 'Frank Miller',
        age: 29,
        gender: 'male',
        avatarUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
        photos: ['https://randomuser.me/api/portraits/men/6.jpg'],
        bio: 'Tech geek and gamer.',
        location: { city: 'Austin', country: 'USA' },
        interests: ['tech', 'gaming', 'music'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore' },
        compatibilityScore: 91,
        verified: false,
        status: 'online',
        lastSeen: new Date(),
        preferences: { theme: 'dark' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p7',
            userId: '1',
        name: 'Grace Park',
        age: 24,
        gender: 'female',
        avatarUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
        photos: ['https://randomuser.me/api/portraits/women/7.jpg'],
        bio: 'Yoga lover and traveler.',
        location: { city: 'Boston', country: 'USA' },
        interests: ['yoga', 'travel', 'cooking'],
        lifestyle: { smoking: false, drinking: false, diet: 'vegetarian', pets: [] },
        compatibilityScore: 80,
        verified: true,
        status: 'online',
        lastSeen: new Date(),
        preferences: { theme: 'light' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p8',
            userId: '1',
        name: 'Henry Davis',
        age: 31,
        gender: 'male',
        avatarUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
        photos: ['https://randomuser.me/api/portraits/men/8.jpg'],
        bio: 'Entrepreneur and coffee lover.',
        location: { city: 'Denver', country: 'USA' },
        interests: ['business', 'coffee', 'cycling'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore', pets: ['dog'] },
        compatibilityScore: 77,
        verified: false,
        status: 'away',
        lastSeen: new Date(),
        preferences: { theme: 'dark' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p9',
            userId: '1',
        name: 'Isabella Martinez',
        age: 26,
        gender: 'female',
        avatarUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
        photos: ['https://randomuser.me/api/portraits/women/9.jpg'],
        bio: 'Photographer and foodie.',
        location: { city: 'Miami', country: 'USA' },
        interests: ['photography', 'food', 'travel'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore', pets: [] },
        compatibilityScore: 86,
        verified: true,
        status: 'online',
        lastSeen: new Date(),
        preferences: { theme: 'light' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p10',
            userId: '1',
        name: 'Jack Thompson',
        age: 32,
        gender: 'male',
        avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
        photos: ['https://randomuser.me/api/portraits/men/10.jpg'],
        bio: 'Musician and adventurer.',
        location: { city: 'Portland', country: 'USA' },
        interests: ['music', 'adventure', 'hiking'],
        lifestyle: { smoking: false, drinking: true, diet: 'omnivore', pets: ['cat'] },
        compatibilityScore: 79,
        verified: false,
        status: 'offline',
        lastSeen: new Date(),
        preferences: { theme: 'dark' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

  setProfile(profile: Profile | null){
    this.profileSubject.next(profile);
  }

  fetchProfile(): Observable<ProfileResponse>{
    return this.profileHttpService.fetchProfile().pipe(
      tap((response) => {
        if (response?.data?.profile?.id) {
          this.accountService.setAccountProfile(response.data.profile);
        } else {
          this.setProfile(null);
        }
        this.profileLoadedSubject.next(true);
      })
    );
  }
  get getProfile$(): Observable<Profile | null>{
    return this.profileSubject.asObservable();
  }
}
