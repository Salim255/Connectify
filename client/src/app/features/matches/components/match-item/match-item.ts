import { Component, input } from "@angular/core";
import { Router } from "@angular/router";
import { Match } from "../../model/match.model";

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.html',
  styleUrls: ['./match-item.scss'],
  standalone: false,
})
export class MatchItemComponent {
  match = input<Match>();

  constructor(private router: Router){}

  viewProfile(){
    this.router.navigate(['/profile'])
  }

  get avatar(): string{
    return ''
  }

  get matchAge(): number {
    const age = this.match()?.profile?.age;
    return age ?? 0;
  }

  get  matchName(): string {
    const name =  this.match()!.profile.name;
    return name  ?? '';
  }
}
