import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountHeaderService } from "../../services/account-header.service";
import { Profile } from "src/app/features/profile/model/profile.model";
import { AccountService } from "../../services/account.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss'],
  standalone: false
})
export class AccountDashboardComponent implements OnInit{
  accountProfile: Profile | null = null;
  accountProfileSubscription!: Subscription;
  constructor(
    private router: Router,
    private accountHeaderService: AccountHeaderService,
    private accountService: AccountService
  ){};

  ngOnInit(): void {
    this.accountHeaderService.setHeaderHide(false);
  }

  subscribeToAccountProfile(){
    this.accountProfileSubscription = this.accountService.getAccountProfile$.subscribe(profile => {
      if(profile) {
        this.accountProfile = profile;
      }

    })
  }

  onNavigate(navType: 'settings'| 'profile'){
    //this.accountHeaderService.setHeaderHide(true);
    if (navType === 'settings') {
      this.router.navigate(['/account/settings']);
    }else {
     this.router.navigate(['/account/account-profile']);
    }
  }

  get getAvatarUrl(){
    return "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D";
  }
}
