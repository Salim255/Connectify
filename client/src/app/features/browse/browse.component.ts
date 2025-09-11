import { Component } from "@angular/core";
import { BrowseService } from "./services/browse.serve";
import { BrowseProfile } from "./model/browse.model";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  standalone: false
})

export class BrowseComponent {
  browseProfiles: BrowseProfile [];
  constructor(private browseService: BrowseService){
    this.browseProfiles = this.browseService.BROWSE_PROFILES;
  }
}
