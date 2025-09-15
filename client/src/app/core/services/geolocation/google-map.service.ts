import { ElementRef, Injectable } from "@angular/core";
import { GoogleMap } from "@capacitor/google-maps";
import { environment } from "src/environments/environment.prod";
import { Coordinates } from "./geolocation.service";
import { GeolocationService } from "./geolocation.service";
import { ModalController } from "@ionic/angular";
import { LocationPickerComponent } from "src/app/shared/components/location-picker/location-picker";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  private currentMarker: string | null = null;
  locationName: {city: any, country: any} | null = null;

  locationNAmeSubject = new BehaviorSubject<{city: any, country: any} | null>(null);
  getLocationNAmeSubject$ = this.locationNAmeSubject.asObservable();

  constructor(
    private modalController: ModalController,
    private geolocationService: GeolocationService,
  ) {

  }

  async createLocationPickerModal() {
    const modal = await this.modalController.create({
      component: LocationPickerComponent,
      cssClass: 'location-picker-modal',
    });

    await modal.present();
    return modal;
  }

  async dismissLocationPickerModal() {
    await this.modalController.dismiss();
  }

  async createMap(coordinate: Coordinates, mapElement: ElementRef<HTMLElement>): Promise<any> {
    console.log('Creating map at:', mapElement);
    return await GoogleMap.create({
      id: 'my-cool-map',
      element: mapElement?.nativeElement,
      apiKey: environment.GoogleMapAPIKey,
      config: {
        center: {
          lat: coordinate?.latitude ?? 33.6,
          lng: coordinate?.longitude ?? -117.9,
        },
        zoom: 14,
      },
    });
  }

  listenForMapClick(map: GoogleMap, onLocationResolved?: (locationName: {city: any, country: any}) => void ): void {
    map.setOnMapClickListener(async(event) => {
      // Remove current marker if it exists
      if (this.currentMarker) {
        await map.removeMarker(this.currentMarker);
        this.currentMarker = null;
      }

      const { latitude, longitude } = event;

      // Add marker at clicked location
      this.currentMarker = await map?.addMarker({
        coordinate: { lat: latitude, lng: longitude },
        title: '',
      });

      if (onLocationResolved) {
        this.locationName = await this.geolocationService.getCityAndCountry(latitude, longitude);
        this.locationNAmeSubject.next(this.locationName);
        onLocationResolved(this.locationName);
      }
    });
  }
}
