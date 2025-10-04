import { Component, input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Chat } from "src/app/features/chat/model/chat.model";
import { ChatService } from "src/app/features/chat/services/chat.service";

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
  standalone: false
})

export class ChatItemComponent implements OnInit {
  chat = input<Chat>();

  constructor(
    private router: Router,
    private chatService : ChatService,
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.chat());
  }
  openChat(): void {
    const chat = this.chat();
    if(!chat) return;
    this.chatService.setActiveChat(chat);
    this.router.navigate(['/chat']);
  }

  get avatarUrl(): string {
    //return this.chat()?.participants[0]?.profile?.avatarUrl ?? '';
    return "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D";
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
  //
}
