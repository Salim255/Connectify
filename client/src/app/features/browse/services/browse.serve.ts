import { Injectable } from "@angular/core";
import { Profile } from "../../profile/model/profile.model";
import { ProfileService } from "../../profile/services/profile.service";
@Injectable({providedIn: 'root'})

export class BrowseService {
  BROWSE_PROFILES: Profile [];
  constructor(private profileService: ProfileService){
    this.BROWSE_PROFILES  = this.profileService.PROFILES_PLACEHOLDER;
  }
}
