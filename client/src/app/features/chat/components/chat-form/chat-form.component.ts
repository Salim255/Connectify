import { Component } from "@angular/core";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss'],
  standalone: false,
})


export class ChatFomComponent {
  textMessage: string = '';
  constructor(){}

  onSubmit(event: any): void {
  }

  onChange(event: string): void{
    console.log(event);
  }

  onSend():void{}
}
