import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { CustomGridComponent } from "./kits/custom-grid/custom-grid.component";

@NgModule({
  imports: [ IonicModule],
  declarations: [CustomGridComponent, HeaderComponent ],
  exports: [CustomGridComponent,  HeaderComponent ]
})
export class SharedModule {

}
