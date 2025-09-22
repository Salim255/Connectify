import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { IonicModule } from "@ionic/angular";
import { CustomGridComponent } from "./kits/custom-grid/custom-grid.component";
import { LocationPickerComponent } from "./components/location-picker/location-picker";
import { DatePickerComponent } from "./kits/date-picker/date-picker.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ IonicModule],
  declarations: [DatePickerComponent, LocationPickerComponent, CustomGridComponent, HeaderComponent ],
  exports: [DatePickerComponent, LocationPickerComponent, CustomGridComponent,  HeaderComponent ]
})
export class SharedModule {

}
