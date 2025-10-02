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
    this.socket.on('message:receive', (message) => {
      console.log('New message received:', message);
      // You can push this to a BehaviorSubject or call a handler
    });
  }

  initializeChatGateway(){
    console.log('Hello from Chat gateway')
  }
}
