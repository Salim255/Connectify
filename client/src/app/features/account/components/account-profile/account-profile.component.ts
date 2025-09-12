import { Component, signal } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss'],
  standalone: false
})

export class AccountProfileComponent {

  headerTitle = signal<string>('view profile');

  constructor(private accountHeaderService: AccountHeaderService){}
  ngOnInit(): void {
    this.accountHeaderService.setHeaderHide(true);
  }
  onToggle(input: 'view profile' | 'edit profile'){
    if (this.headerTitle() === input ) return;
    this.headerTitle.set(input);
  }
  onBack(): void{
    this.accountHeaderService.setHeaderHide(false);
  }
}
