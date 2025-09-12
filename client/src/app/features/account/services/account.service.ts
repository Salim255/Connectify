import { Injectable } from "@angular/core";
import { ProfileService } from "../../profile/services/profile.service";
import { Profile } from "../../profile/model/profile.model";

@Injectable({providedIn: 'root'})
export class AccountService {
  accountProfile: Profile;
  constructor(private profileService: ProfileService){
    this.accountProfile = this.profileService.PROFILES_PLACEHOLDER[0];
  }

}
