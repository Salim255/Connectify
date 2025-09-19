import { Injectable } from "@angular/core";
import { Match, MatchStatus } from "../model/match.model";
import { Profile } from "../../profile/model/profile.model";
import { ProfileService } from "../../profile/services/profile.service";

@Injectable({providedIn: 'root'})
export class MatchesService {
  profiles: Profile [];
  MATCHES_PLACEHOLDER: Match[];
  constructor(private profileService: ProfileService){
    this.profiles = this.profileService.PROFILES_PLACEHOLDER;
    this.MATCHES_PLACEHOLDER = [
      {
        id: '1',
        profile: this.profiles[0],
        matchedAt: new Date(),                     // timestamp of the match
        status: MatchStatus.MATCHED,                 // true if both liked
        isFavorite: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        profile: this.profiles[1],
        matchedAt: new Date(),                     // timestamp of the match
        status: MatchStatus.MATCHED,                 // true if both liked
        isFavorite: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        profile: this.profiles[2],
        matchedAt: new Date(),                     // timestamp of the match
        status: MatchStatus.MATCHED,                 // true if both liked
        isFavorite: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        profile: this.profiles[0],
        matchedAt: new Date(),                     // timestamp of the match
        status: MatchStatus.MATCHED,                 // true if both liked
        isFavorite: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        profile: this.profiles[0],
        matchedAt: new Date(),                     // timestamp of the match
        status: MatchStatus.MATCHED,                 // true if both liked
        isFavorite: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

}
