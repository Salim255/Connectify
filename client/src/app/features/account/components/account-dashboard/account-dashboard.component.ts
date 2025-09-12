import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AccountHeaderService } from "../../services/account-header.service";

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss'],
  standalone: false
})
export class AccountDashboardComponent{
   constructor(
    private router: Router,
    private accountHeaderService: AccountHeaderService,
  ){};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("hello from dashboard");
    this.accountHeaderService.setHeaderHide(false);
  }
  onNavigate(navType: 'settings'| 'profile'){
    this.accountHeaderService.setHeaderHide(true);
    if (navType === 'settings') {
      this.router.navigate(['/account/settings']);
    }else {
     this.router.navigate(['/account/account-profile']);
    }
  }
}
