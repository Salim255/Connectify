import { Component } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss'],
  standalone: false
})

export class AccountProfileComponent {
  constructor(private accountHeaderService: AccountHeaderService){}

  onBack(): void{
    this.accountHeaderService.setHeaderHide(false);
  }
}
