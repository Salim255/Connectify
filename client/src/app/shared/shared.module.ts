import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { CustomGridComponent } from "./kits/custom-grid/custom-grid.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ IonicModule],
  declarations: [CustomGridComponent, HeaderComponent ],
  exports: [CustomGridComponent,  HeaderComponent ]
})
export class SharedModule {

}
