import { Injectable } from "@angular/core";
import { Profile } from "../../profile/model/profile.model";
import { ProfileService } from "../../profile/services/profile.service";
import { BrowseHttpService, InitiateMatchDto, PotentialMatchesResponse } from "./browse-http.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { BrowseProfile } from "../model/browse.model";
@Injectable({providedIn: 'root'})

export class BrowseService {
  BROWSE_PROFILES: Profile [];

  browseProfileSubscription = new BehaviorSubject<BrowseProfile[] | null>(null);

  constructor(
    private browseHttpService: BrowseHttpService,
    private profileService: ProfileService,
  ){
    this.BROWSE_PROFILES  = this.profileService.PROFILES_PLACEHOLDER;
  }

  getBrowsePotentialMatches():Observable<PotentialMatchesResponse>{
    return this.browseHttpService.fetchPotentialMatches().pipe(
      tap((response) => {
        console.log(response);
        if (response.data.matches){
          this.setBrowseProfiles(response.data.matches);
        }else {
          this.setBrowseProfiles(null);
        }
      })
    );
  }

  initiateMatch(fromUserId: InitiateMatchDto){
    return this.browseHttpService.createMatch(fromUserId);
  }

  setBrowseProfiles(profiles: BrowseProfile[] | null): void {
    this.browseProfileSubscription.next(profiles)
  }
  get getProfiles$(): Observable<BrowseProfile[] | null>{
    return this.browseProfileSubscription.asObservable();
  }
}
