import { Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";
import { io, Socket } from "socket.io-client";
import { environment } from "../../../environments/environment";

export enum ConnectionStatus {
  Online = 'online',
  Offline = 'offline',
}

@Injectable({ providedIn: 'root' })
export class SocketCoreService {
  private socket: Socket | null = null;
  private ENV = environment;
  private baseUrl: string = `${this.ENV.socketUrl}`;

  private connectionStatusSubject =
    new BehaviorSubject<ConnectionStatus>(ConnectionStatus.Offline);
  readonly connectionStatus$ = this.connectionStatusSubject.asObservable();
  constructor( ){}

  initialize(userId: string): void {
     // If a socket instance already exists, don’t recreate it
    if (this.socket) {
      return;
    }

    this.socket = io(this.baseUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      transports: ['websocket'],
      withCredentials: true,
    });

    this.socket?.on('connect', () => {
      this.socket?.emit('register-user', userId);
    });

    this.socket?.on('disconnect', () => {
      this.connectionStatusSubject.next(ConnectionStatus.Offline);
    });
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    //
  }
}
