import { Component } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";
import { AccountService } from "../../services/account.service";
import { Profile } from "src/app/features/profile/model/profile.model";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
  standalone: false
})

export class ViewProfileComponent {
  accountProfile: Profile;
  constructor(
  private accountService: AccountService,
  ){
  this.accountProfile = this.accountService.accountProfile;
  }
}
