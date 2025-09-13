import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ViewProfileComponent } from "./view-profile.component";
import { ViewProfileRoutingModule } from "./view-profile-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ViewProfileRoutingModule,
    SharedModule
  ],
  declarations:[ ViewProfileComponent ]
})

export class ViewProfileModule {}
