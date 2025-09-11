import { Injectable } from "@angular/core";
import { Match } from "../model/match.model";
import { Profile } from "../../profile/model/profile.model";
import { ProfileService } from "../../profile/services/profile.service";

@Injectable({providedIn: 'root'})

export class MatchesService {
  profiles: Profile [] = [];
  constructor(private profileService: ProfileService){
    this.profiles = this.profileService.PROFILES_PLACEHOLDER;
  }
  MATCHES_PLACEHOLDER: Match[] = [
    {
      id: '1',
      profile: this.profiles[0],
      matchedAt: new Date(),                     // timestamp of the match
      isMutual: true,                 // true if both liked
      seen: true,
    },
    {
      id: '2',
      profile: this.profiles[1],
      matchedAt: new Date(),                     // timestamp of the match
      isMutual: true,                 // true if both liked
      seen: true,
    },
    {
      id: '3',
      profile: this.profiles[2],
      matchedAt: new Date(),                     // timestamp of the match
      isMutual: true,                 // true if both liked
      seen: true,
    },
    {
      id: '4',
      profile: this.profiles[0],
      matchedAt: new Date(),                     // timestamp of the match
      isMutual: true,                 // true if both liked
      seen: true,
    },
    {
      id: '5',
      profile: this.profiles[0],
      matchedAt: new Date(),                     // timestamp of the match
      isMutual: true,                 // true if both liked
      seen: true,
    },
  ];
}
