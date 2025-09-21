import { Component, input } from "@angular/core";
import { Router } from "@angular/router";
import { Chat } from "src/app/features/chat/model/chat.model";
import { ChatService } from "src/app/features/chat/services/chat.service";

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
  standalone: false
})

export class ChatItemComponent {
  chat = input<Chat>();

  constructor(
    private router: Router,
    private chatService : ChatService,
  ){}

  openChat(): void {
    const chat = this.chat();
    if(!chat) return;
    this.chatService.setActiveChat(chat);
    this.router.navigate(['/chat']);
  }

  get avatarUrl(): string {
    return this.chat()?.participants[0]?.profile?.avatarUrl ?? '';
  }

  get unreadCount(): number{
    return 0;
  }

  get lastMessage(): string {
    return 'last message'
  }

  get lasMessageDate(): Date{
    return new Date();
  }
}
