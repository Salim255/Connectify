import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AccountDashboardComponent } from "./account-dashboard.component";
import { AccountDashboardRoutingModule } from "./account-dashboard-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountHeaderService } from "../../services/account-header.service";
import { Router } from "@angular/router";

@NgModule({
  imports: [
    AccountDashboardRoutingModule,
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [AccountDashboardComponent]
})


export class AccountDashboardModule {}
