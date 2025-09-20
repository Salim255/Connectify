import { Component, OnInit } from "@angular/core";
import { BrowseService } from "./services/browse.serve";
import { BrowseProfile } from "./model/browse.model";
import { PAGES } from "src/app/shared/components/header/header.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  standalone: false
})

export class BrowseComponent implements OnInit {
  pageName: PAGES = PAGES.BROWSE;
  browseProfiles: BrowseProfile [];

  browseProfilesSubscription!: Subscription;

  constructor(private browseService: BrowseService){
    this.browseProfiles = this.browseService.BROWSE_PROFILES;
  }
  ngOnInit(): void {
    this.subscribeToBrowseProfiles();
  }


  subscribeToBrowseProfiles(): void{
    this.browseProfilesSubscription = this.browseService.getBrowseProfiles().subscribe();
  }
}
