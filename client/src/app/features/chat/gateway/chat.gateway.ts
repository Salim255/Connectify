import { Injectable } from "@angular/core";
import { Socket } from "socket.io-client";
import { SocketCoreService } from "src/app/socket/services/socket-presence.service";

@Injectable({providedIn: 'root'})

export class ChatGatewayService {
  private socket: Socket;

  constructor(private socketCore: SocketCoreService){
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
  }

  sendMessage(payload: { chatId: string; senderId: string; content: string }): void {
    this.socket.emit('message:send', payload);
  }

  notifyInRoom(roomId: string): void {
    console.log(roomId);
    this.socket.emit('user:inRoom', roomId);
  }

  notifyLeftRoom(roomId: string): void {
    this.socket.emit('user:leftRoom', roomId);
  }

  initializeChatGateway(){
    console.log('Hello from Chat gateway')
  }
}
