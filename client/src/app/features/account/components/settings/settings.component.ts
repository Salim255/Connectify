import { Component, OnInit } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: false
})

export class SettingsComponent implements OnInit {
  constructor(private accountHeaderService :AccountHeaderService ){}

  ngOnInit(): void {
    this.accountHeaderService.setHeaderHide(true);
  }
  onBack(): void{
    this.accountHeaderService.setHeaderHide(false);
  }
}
