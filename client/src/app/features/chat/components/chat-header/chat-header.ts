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
  chatTitle: string = 'chat';
  profile: Profile;
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private chatService: ChatService){
    this.profile = this.chatService.partnerProfile;
  }

  onOptions(): void{

  }

  onProfile(){
    this.profileService.setProfile(this.profile);
    this.router.navigate(['/profile'])
  }
}
