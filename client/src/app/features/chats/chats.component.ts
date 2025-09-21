import { Component, OnDestroy, OnInit } from "@angular/core";
import { Chats } from "./model/chats.model";
import { ChatsService } from "./services/chats.service";
import { Router } from "@angular/router";
import { Chat } from "../chat/model/chat.model";
import { PAGES } from "src/app/shared/components/header/header.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  standalone: false,
})
export class ChatsComponent implements OnInit, OnDestroy {
  pageName: PAGES = PAGES.CHATS;
  chats: Chats | null = null;

  private chatsSubscription!: Subscription;

  constructor(private router: Router, private chatsService:ChatsService){
    this.chats = this.chatsService.CHATS_PLACEHOLDER;
  }

  ngOnInit(): void {
    this.subscribeToChats();
  }

  ionViewWillEnter(){
    this.chatsService.fetchUserChats().subscribe();
  }

  subscribeToChats(){
    this.chatsSubscription =  this.chatsService.getUserChats$.subscribe(chats => {
      console.log(chats);
      this.chats = chats;
    })
  }

  selectChat(chat: Chat): void {
    //console.log(chat);
    this.router.navigate(['/chat'])
  }

  get allChats(): Chat [] | [] {
    const lstChat = this.chats;
    return lstChat ??  [];
  }

  ngOnDestroy(): void {
    this.chatsSubscription?.unsubscribe();
  }
}
