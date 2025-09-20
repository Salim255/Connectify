import { Injectable } from "@angular/core";
import { Profile } from "../../profile/model/profile.model";
import { ProfileService } from "../../profile/services/profile.service";
import { BrowseHttpService } from "./browse-http.service";
import { Observable, tap } from "rxjs";
@Injectable({providedIn: 'root'})

export class BrowseService {
  BROWSE_PROFILES: Profile [];

  constructor(
    private browseHttpService: BrowseHttpService,
    private profileService: ProfileService,
  ){
    this.BROWSE_PROFILES  = this.profileService.PROFILES_PLACEHOLDER;
  }

  getProfiles():Observable<any>{
    return this.browseHttpService.fetchProfiles().pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }
}
