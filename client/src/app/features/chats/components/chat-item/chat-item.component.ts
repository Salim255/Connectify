import { Component, input } from "@angular/core";
import { Chat } from "src/app/features/chat/model/chat.model";


@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
  standalone: false
})

export class ChatItemComponent {
  chat = input<Chat>();

  openChat(chat: Chat | undefined): void {}

  get avatarUrl(): string {
    return this.chat()?.participants[0].profile.avatarUrl ?? '';
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
