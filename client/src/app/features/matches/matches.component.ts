import { Component } from "@angular/core";
import { MatchesService } from "./services/matches.service";
import { Match } from "./model/match.model";
import { PAGES } from "src/app/shared/components/header/header.component";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  standalone: false
})

export class MatchesComponent {
  pageName: PAGES = PAGES.MATCHES;
  matches: Match [];

  constructor(private matchesService: MatchesService){
    this.matches = this.matchesService.MATCHES_PLACEHOLDER;
  }
}
