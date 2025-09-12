import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AccountDashboardComponent } from "./account-dashboard.component";
import { AccountDashboardRoutingModule } from "./account-dashboard-routing.module";

@NgModule({
  imports: [AccountDashboardRoutingModule,CommonModule, IonicModule],
  declarations: [AccountDashboardComponent]
})


export class AccountDashboardModule {}
