import { NgModule } from "@angular/core";
import { BrowseRoutingModule } from "./browse-routing.module";
import { IonicModule } from "@ionic/angular";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowseComponent } from "./browse.component";
import { BrowseItemComponent } from "./components/browse-item/browse-item.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrowseRoutingModule,
    NgOptimizedImage,
    SharedModule
  ],
  declarations: [BrowseItemComponent, BrowseComponent ]
})
export class BrowserModule {}
