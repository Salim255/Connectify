import { Component, input } from "@angular/core";

export enum PAGES  {
  MATCHES = 'matches',
  CHATS = 'chats',
  BROWSE = 'browse',
  ACCOUNT = 'account'
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})

export class HeaderComponent {
  headerTitle = input<PAGES>();

  constructor(){}
}
