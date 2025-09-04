import { NgModule } from "@angular/core";
import { BrowseRoutingModule } from "./browse-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowseComponent } from "./browse.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrowseRoutingModule,
  ],
  declarations: [ BrowseComponent ]
})
export class BrowserModule {}
