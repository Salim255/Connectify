
import { Profile } from "../../profile/model/profile.model";

export enum MatchStatus {
  PENDING = 'pending', // maybe one-sided like
  MATCHED = 'matched', // mutual like
  BLOCKED = 'blocked', // one user blocked the other
  UNMATCHED = 'unmatched', // match ended
}

export interface Match {
  id: string;           // match ID
  profile: Profile;     // matched profile
  matchedAt?: Date;     // timestamp of the match
  status: MatchStatus;  // true if both liked
  isFavorite: boolean;
  isHidden: boolean,
  createdAt: Date;
  updatedAt: Date;
}
