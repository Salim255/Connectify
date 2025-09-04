import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MatchesRoutingModule } from "./matches-routing.module";
import { MatchesComponent } from "./matches.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    MatchesRoutingModule
  ],
  declarations: [MatchesComponent]
})
export class MatchesModule {}
