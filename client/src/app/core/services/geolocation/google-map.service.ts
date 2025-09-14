import { ElementRef, Injectable } from "@angular/core";
import { GoogleMap } from "@capacitor/google-maps";
import { environment } from "src/environments/environment.prod";
import { Coordinates } from "./geolocation.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  constructor() { }

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

}
