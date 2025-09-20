import { Component, OnInit } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";
import { AccountService } from "../../services/account.service";
import { Profile } from "src/app/features/profile/model/profile.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
  standalone: false
})

export class ViewProfileComponent implements OnInit {
  accountProfile: Profile | null = null;
  accountProfileSubscription!: Subscription;

  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    this.subscribeToAccountProfile();
  }

  subscribeToAccountProfile(){
    this.accountProfileSubscription = this.accountService.getAccountProfile.subscribe(profile => {
      this.accountProfile = profile;
    })
  }
}
