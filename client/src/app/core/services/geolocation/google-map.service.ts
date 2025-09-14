import { ElementRef, Injectable } from "@angular/core";
import { GoogleMap } from "@capacitor/google-maps";
import { environment } from "src/environments/environment.prod";
import { Coordinates } from "./geolocation.service";
import { GeolocationService } from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  private currentMarker: string | null = null;
  constructor(private geolocationService: GeolocationService) { }

  async  createMap(coordinate: Coordinates, mapElement: ElementRef<HTMLElement>): Promise<any> {
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
        const locationName = await this.geolocationService.getCityAndCountry(latitude, longitude);
        onLocationResolved(locationName);
      }
    });
  }
}
