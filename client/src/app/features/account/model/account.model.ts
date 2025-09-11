import { Profile } from "../../profile/model/profile.model";

export interface Account extends Profile {
  settings?: {
    privacy?: {
      showOnlineStatus?: boolean;
      showDistance?: boolean;
    };
    notifications?: {
      email?: boolean;
      push?: boolean;
    };
  };
}
