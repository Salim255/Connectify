
import { Profile } from "../../profile/model/profile.model";

export interface Match {
  id: string;                          // match ID
  profile: Profile;                    // matched profile
  matchedAt: Date;                     // timestamp of the match
  isMutual: boolean;                   // true if both liked
  seen?: boolean;                      // if user saw this match
}
