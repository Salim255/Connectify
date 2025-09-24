import { Component, OnInit } from "@angular/core";
import { BrowseService } from "./services/browse.service";
import { BrowseProfile } from "./model/browse.model";
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
  browseProfiles: BrowseProfile [] = [];

  browseProfilesSubscription!: Subscription;

  constructor(private browseService: BrowseService){}

  ngOnInit(): void {
    this.subscribeToBrowseProfiles();
  }

  ionViewWillEnter(){
    this.browseService.getBrowseProfiles().subscribe();
  }

  subscribeToBrowseProfiles(): void{
    this.browseProfilesSubscription = this.browseService.getProfiles$.subscribe(profiles=> {
      this.browseProfiles = profiles ?? [];
    })
  }

  onLike(profile: BrowseProfile){
    const payload:InitiateMatchDto = { toUserId: profile.userId };
    this.browseService.initiateMatch(payload).subscribe({
      next: () => {
        // Remove the liked profile from the list
        this.browseProfiles = this.browseProfiles?.filter(
          (p) => p.userId !== profile.userId
        );
      },
      error: () => {

      }
    });
  }
}
