import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { GoogleMap } from "@capacitor/google-maps";
import { Coordinates } from "src/app/core/services/geolocation/geolocation.service";
import { GoogleMapService } from "src/app/core/services/geolocation/google-map.service";

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.html',
  styleUrls: ['./location-picker.scss'],
  standalone: false
})

export class LocationPickerComponent implements AfterViewInit {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  currentLocation: Coordinates | null = null;

  constructor(private googleMapService: GoogleMapService){}

  async ngAfterViewInit():Promise<void> {
    await this.createMap();
  }

  async createMap() {
    this.newMap =  await this.googleMapService.createMap(this.currentLocation!, this.mapRef);
    console.log(this.newMap);
    this.googleMapService.listenForMapClick(this.newMap, (locationName) => {
      console.log('Location:', locationName);
      this.googleMapService.dismissLocationPickerModal();
    });
  }
}
