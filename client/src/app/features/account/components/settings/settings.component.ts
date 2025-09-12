import { Component } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: false
})

export class SettingsComponent {
  constructor(private accountHeaderService :AccountHeaderService  ){}
  onBack(): void{
    this.accountHeaderService.setHeaderHide(false);
  }
}
