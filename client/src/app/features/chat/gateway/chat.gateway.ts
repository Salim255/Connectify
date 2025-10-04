import { Injectable } from "@angular/core";
import { Socket } from "socket.io-client";
import { SocketCoreService } from "src/app/socket/services/socket-presence.service";
import { BehaviorSubject } from "rxjs";

export type TypingPayload = {
  roomId: string;
  typing: boolean;
}

export interface ChatEvent {
  type: 'userJoined' | 'messageRead' | 'typing' ;
}


export type SendMessagePayload = {
  roomId: string;
  partnerId: string;
}

@Injectable({providedIn: 'root'})
export class ChatGatewayService {
  private socket: Socket;
  private fetchChatByIdEventSubject = new BehaviorSubject<ChatEvent | null>(null);
  chatEvents = this.fetchChatByIdEventSubject.asObservable();
  constructor(
    private socketCore: SocketCoreService,
  ){
    const socketInstance = this.socketCore.getSocket();

    if (!socketInstance) {
      throw new Error('SocketCoreService must be initialized before using ChatGatewayService');
    }

    this.socket = socketInstance;
    this.registerListeners();
  }

  private registerListeners(): void {
    console.log('Listener running....')
    this.socket.on('message:receive', (message) => {
      console.log('New message received:', message);
      // You can push this to a BehaviorSubject or call a handler
    });

    this.socket.on('user:online', (userId) => {
      console.log('User is online:', userId);
    });

    this.socket.on('user:offline', (userId) => {
      console.log('User is offline:', userId);
    });

    this.socket.on('receiver:read-messages', (chatId) => {
      ///this.chatService.fetchChatById(chatId);
      console.log(chatId, "hello from message read")
      if(!chatId) return;
      this.fetchChatByIdEventSubject.next({type: 'messageRead'})
      //console.log("hello from here", chatId)
    })
  }

  sendMessage(payload: { chatId: string; senderId: string; content: string }): void {
    this.socket.emit('message:send', payload);
  }

  notifyJoinRoom(roomId: string): void {
    console.log(roomId);
    this.socket.emit('user:joinRoom', roomId);
  }

  notifyLeaveRoom(roomId: string): void {
    this.socket.emit('user:leaveRoom', roomId);
  }

  notifyTyping(payload: TypingPayload){
    if (payload.typing){
     this.socket.emit('user:typing', payload.roomId);
    } else {
      this.socket.emit('user:stop-typing', payload.roomId);
    }
  }

  notifySendMessage(payload: SendMessagePayload ){
    this.socket.emit('user:send-message', payload.roomId);
  }

  initializeChatGateway(){
    console.log('Hello from Chat gateway')
  }
}
