import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MatchesRoutingModule } from "./matches-routing.module";
import { MatchesComponent } from "./matches.component";
import { MatchItemComponent } from "./components/match-item/match-item";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    MatchesRoutingModule,
    SharedModule
  ],
  declarations: [MatchItemComponent, MatchesComponent]
})
export class MatchesModule {}
