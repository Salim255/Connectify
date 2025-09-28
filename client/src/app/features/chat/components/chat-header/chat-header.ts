import { Component } from "@angular/core";
import { ChatService } from "../../services/chat.service";
import { Profile } from "src/app/features/profile/model/profile.model";
import { ProfileService } from "src/app/features/profile/services/profile.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.html',
  styleUrls: ['./chat-header.scss'],
  standalone: false
})

export class ChatHeaderComponent {
  chatStatus: 'online' | 'offline' = 'offline';
  profile: Profile | null;
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private chatService: ChatService){
    this.profile = this.chatService.partnerProfile$;
  }

  onOptions(): void{

  }

  onProfile(){
    this.profileService.setProfile(this.profile);
    this.router.navigate(['/profile'])
  }

  get avatar(): string{
   // console.log(this.match())
   return "https://images.unsplash.com/photo-1742201877377-03d18a323c18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D"
    //return this.match()?.profile?.avatarUrl ?? 'https://images.unsplash.com/photo-1742201877377-03d18a323c18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D';
  }

  get name(){
    return this.profile?.name ;
  }
}
