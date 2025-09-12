import { Component } from "@angular/core";
import { PAGES } from "src/app/shared/components/header/header.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false,
})

export class AccountComponent {
  pageName: PAGES = PAGES.ACCOUNT;
}
