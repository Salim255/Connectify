import { Component } from "@angular/core";
import { Chat } from "./model/chat.model";
import { ChatsService } from "./services/chats.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  standalone: false,
})
export class ChatsComponent {
  chats: Chat [];
  constructor(private router: Router, private chatsService:ChatsService){
    this.chats = this.chatsService.chatsPlaceholder;
  }
  selectChat(): void {
    this.router.navigate(['/chat'])
  }
}
