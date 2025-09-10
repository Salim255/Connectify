import { Component } from "@angular/core";
import { IonHeader, IonIcon, IonButtons, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.html',
  styleUrls: ['./chat-header.scss'],
  standalone: false
})

export class ChatHeaderComponent {
  chatStatus: 'online' | 'offline' = 'offline';
  chatTitle: string = 'chat';

  constructor(){}

  onOptions(): void{

  }
}
