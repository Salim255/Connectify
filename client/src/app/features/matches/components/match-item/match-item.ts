import { Component, input } from "@angular/core";
import { Router } from "@angular/router";
import { Match } from "../../model/match.model";
import { ChatService } from "src/app/features/chat/services/chat.service";
import { Chat } from "src/app/features/chat/model/chat.model";

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
    private router: Router,
  ){}

  onChat(){
    const profile = this.match()?.profile;

    if (!profile)  return;
    this.chatService.fetchChatByProfilesIds(profile.id).subscribe({
      next: (response) => {
        if (response?.data?.chat?.id){
          this.chatService.setActiveChat(response.data.chat);
        } else {
          this.chatService.setActiveChat(new Chat(null, [{ profile: profile }]))
        }
        this.router.navigate(['/chat'])
      },
      error: () => {
        // Try later
      }
    });

  }

  get avatar(): string{
   // console.log(this.match())
   return "https://images.unsplash.com/photo-1742201877377-03d18a323c18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
    //return this.match()?.profile?.avatarUrl ?? 'https://images.unsplash.com/photo-1742201877377-03d18a323c18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D';
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
