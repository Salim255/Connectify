import { Component, OnInit } from "@angular/core";
import { ChatService } from "./services/chat.service";
import { Message } from "./model/message.model";
import { Chat } from "./model/chat.model";
import { ChatGatewayService } from "./gateway/chat.gateway";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false
})
export class ChatComponent implements OnInit{
  messages: Message [];
  activeChat: Chat;
  activeChatSubscription!: Subscription;
  constructor(
    private chatGatewayService: ChatGatewayService,
    private chatService: ChatService,
  ){
    //this.messages =  this.chatService.placeholderMessages;
    this.activeChat = this.chatService.getActiveChat;
    this.messages = this.activeChat.messages;
  }

  ngOnInit(): void {
    console.log(this.activeChat);
    if (this.activeChat.id) this.chatGatewayService.notifyJoinRoom(this.activeChat.id);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.activeChat.id) this.chatGatewayService.notifyLeaveRoom(this.activeChat.id);
  }
}
