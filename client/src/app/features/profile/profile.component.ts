import { Component } from "@angular/core";
import { PAGES } from "src/app/shared/components/header/header.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent {
  pageName: PAGES = PAGES.PROFILE;
}
