import { Component, OnInit } from "@angular/core";
import { BrowseService } from "./services/browse.service";
import { PotentialMatch } from "./model/browse.model";
import { PAGES } from "src/app/shared/components/header/header.component";
import { Subscription } from "rxjs";
import { InitiateMatchDto } from "./services/browse-http.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  standalone: false
})

export class BrowseComponent implements OnInit {
  pageName: PAGES = PAGES.BROWSE;
  browseProfiles: PotentialMatch [] = [];

  browseProfilesSubscription!: Subscription;

  constructor(private browseService: BrowseService){}

  ngOnInit(): void {
    this.subscribeToBrowseProfiles();
  }

  ionViewWillEnter(){
    this.browseService.getBrowsePotentialMatches().subscribe();
  }

  subscribeToBrowseProfiles(): void{
    this.browseProfilesSubscription = this.browseService.getPotentialMatches$.subscribe(potentialMatches=> {
      this.browseProfiles = potentialMatches ?? [];
    })
  }

  onLike(match: PotentialMatch){
    if(match.id) {
      this.browseService.acceptMatch(match.id).subscribe({
        next: (match) => {
          console.log(match);
          this.browseProfiles = this.browseProfiles?.filter(
            (p) => p.profile.userId !== match.profile.userId
          );
        },
        error: () => {

        }
      })
    }else {
      const payload:InitiateMatchDto = { toUserId: match.profile.userId };
      this.browseService.initiateMatch(payload).subscribe({
        next: () => {
          // Remove the liked profile from the list
          this.browseProfiles = this.browseProfiles?.filter(
            (p) => p.profile.userId !== match.profile.userId
          );
        },
        error: () => {

        }
      });
    }
  }
}
