import { Component, OnInit } from "@angular/core";
import { ChatService } from "./services/chat.service";
import { Message } from "./model/message.model";
import { Chat } from "./model/chat.model";
import { ChatGatewayService } from "./gateway/chat.gateway";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false
})
export class ChatComponent implements OnInit{
  messages: Message [];
  activeChat: Chat;

  constructor(
    private chatGatewayService: ChatGatewayService,
    private chatService: ChatService,
  ){
    //this.messages =  this.chatService.placeholderMessages;
    this.activeChat = this.chatService.getActiveChat;
    this.messages = this.activeChat.messages;
    this.chatGatewayService.initializeChatGateway();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("hellof rom chat compoent");
    console.log(this.activeChat);
  }
}
