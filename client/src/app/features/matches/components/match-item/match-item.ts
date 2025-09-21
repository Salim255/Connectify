import { Component, input } from "@angular/core";
import { Router } from "@angular/router";
import { Match } from "../../model/match.model";
import { ChatService } from "src/app/features/chat/services/chat.service";

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.html',
  styleUrls: ['./match-item.scss'],
  standalone: false,
})
export class MatchItemComponent {
  match = input<Match>();

  constructor(
    private chatService: ChatService,
    private router: Router){}

  onChat(){
    console.log(this.match());
    const participantId: string | null = this.match()?.profile?.id ?? null;
    if (!participantId)  return;
    this.chatService.fetchChatByProfilesIds(participantId).subscribe(res=>{
      console.log(res);
    });
    //this.router.navigate(['/chat'])
  }

  get avatar(): string{
   // console.log(this.match())
    return this.match()?.profile?.avatarUrl ?? '';
  }

  get matchAge(): number {
    const age = this.match()?.profile?.age;
    return age ?? 0;
  }

  get  matchName(): string {
    const name =  this.match()?.profile?.name;
    return name  ?? '';
  }
}
