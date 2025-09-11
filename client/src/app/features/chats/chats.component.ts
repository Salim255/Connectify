import { Component } from "@angular/core";
import { Chats } from "./model/chats.model";
import { ChatsService } from "./services/chats.service";
import { Router } from "@angular/router";
import { Chat } from "../chat/model/chat.model";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  standalone: false,
})
export class ChatsComponent {
  chats: Chats;
  constructor(private router: Router, private chatsService:ChatsService){
    this.chats = this.chatsService.CHATS_PLACEHOLDER;
  }
  selectChat(): void {
    this.router.navigate(['/chat'])
  }

  get allChats(): Chat [] {
    const lstChat = this.allChats ?? [];
    return lstChat;
  }
}
