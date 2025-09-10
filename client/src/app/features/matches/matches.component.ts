import { Component } from "@angular/core";
import { MatchesService } from "./services/matches.service";
import { Match } from "./model/match.model";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  standalone: false
})

export class MatchesComponent {
  matches: Match [];

  constructor(private matchesService: MatchesService){
    this.matches = this.matchesService.MATCHES_PLACEHOLDER;
  }
}
