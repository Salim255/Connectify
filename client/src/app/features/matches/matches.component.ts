import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatchesService } from "./services/matches.service";
import { Match } from "./model/match.model";
import { PAGES } from "src/app/shared/components/header/header.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  standalone: false
})

export class MatchesComponent implements OnInit, OnDestroy{
  pageName: PAGES = PAGES.MATCHES;
  matches: Match [] | null = null;

  matchesSubscription!: Subscription;

  constructor(private matchesService: MatchesService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscribeToMatches();
  }

  ionViewWillEnter(){
    this.matchesService.fetchUserMatches().subscribe();
  }

  subscribeToMatches(){
    this.matchesSubscription = this.matchesService.getMatches$.subscribe(matches => {
      this.matches = matches;
    })
  }

  ngOnDestroy(): void {
    this.matchesSubscription?.unsubscribe();
  }
}
