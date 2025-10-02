import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { io, Socket } from "socket.io-client";
import { environment } from "../../../environments/environment";
import { Preferences } from "@capacitor/preferences";
import { ChatGatewayService } from "src/app/features/chat/gateway/chat.gateway";

export enum ConnectionStatus {
  Online = 'online',
  Offline = 'offline',
}

@Injectable({ providedIn: 'root' })
export class SocketCoreService {
  private socket: Socket | null = null;
  private ENV = environment;
  private baseUrl: string = `${this.ENV.socketUrl}`;
  private token: string | null = null;
  private userId: string | null = null;

  private connectionStatusSubject =
    new BehaviorSubject<ConnectionStatus>(ConnectionStatus.Offline);
  readonly connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor(){}

  async loadToken(): Promise<void> {
    const { value } = await Preferences.get({ key: 'authData' });
    if (value) {
      const parsedData = JSON.parse(value) as {
        _token: string;
        userId: string;
        tokenExpirationDate: string;
      };
      this.token = parsedData._token;
      this.userId = parsedData.userId;
    }
  }

  async initialize(): Promise<void> {
     // If a socket instance already exists, don’t recreate it
    if (this.socket) {
      return;
    }

    // Ensure token is loaded before connecting
    if (!this.token) {
      await this.loadToken();
    }

    this.socket = io(this.baseUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      transports: ['websocket'],
      withCredentials: true,
      auth: {
        token: this.token, // use the class property
      },
    });

    this.socket?.on('connect', () => {
      this.socket?.emit('register-user', this.userId);
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
  }
}
