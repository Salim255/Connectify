import { Component, OnInit, signal } from "@angular/core";
import { PAGES } from "src/app/shared/components/header/header.component";
import { AccountHeaderService } from "./services/account-header.service";
import { Subscription } from "rxjs";
import { AccountService } from "./services/account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})

export class AccountComponent implements OnInit {
  pageName: PAGES = PAGES.ACCOUNT;
  private hideAccountHeaderSubscription!: Subscription;
  private accountProfileSubscription!: Subscription;

  constructor(
    private accountService: AccountService,
    private accountHeaderService: AccountHeaderService,
  ){}

  isHidden = signal<boolean>(false)

  ngOnInit(): void {
    this.subscribeToHideHeader();
    this.subscribeToAccountProfile();
  }

  private subscribeToAccountProfile(){
    this.accountProfileSubscription = this.accountService.getAccountProfile$.subscribe(profile => {
      console.log(profile);
    })
  }
  private subscribeToHideHeader(){
    this.hideAccountHeaderSubscription = this.accountHeaderService.getHideHeaderStatus$.subscribe(
      status => {
        console.log(status);
        if (status) this.isHidden.set(true);
        else this.isHidden.set(false);
      }
    )
  }

  ngOnDestroy(): void {
    console.log('destroy')
    this.hideAccountHeaderSubscription?.unsubscribe();
    this.accountProfileSubscription?.unsubscribe();
  }
}
