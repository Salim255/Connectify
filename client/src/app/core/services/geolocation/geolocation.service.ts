import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Capacitor } from '@capacitor/core';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private ENV = environment;
  private userCoordinates: Coordinates;

  constructor(private http: HttpClient) { this.userCoordinates = { latitude: 0, longitude: 0 } }

  async requestPermissions(): Promise<any> {
    const permissions = await Geolocation.requestPermissions();
    return permissions;
  }

  async getCurrentCoordinates(): Promise<Coordinates> {
    try {

      if (Capacitor.getPlatform() ===  'web') {
        const position = await new Promise<GeolocationPosition>((resolve, reject) =>{
          navigator.geolocation.getCurrentPosition(resolve, reject);
         });
        this.userCoordinates.latitude = position.coords.latitude;
        this.userCoordinates.longitude = position.coords.longitude;
        return this.userCoordinates;
      }

      const permission = await this.requestPermissions();
      console.log('Permission status:', permission);
      if (!permission) {
        throw new Error('Location permission error');
      }

      const position = await Geolocation.getCurrentPosition();
      this.userCoordinates.latitude = position.coords.latitude;
      this.userCoordinates.longitude = position.coords.longitude;
      return this.userCoordinates;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
       throw new Error(error.message);
    }
  }

  async  getCityAndCountry(lat: number, lng: number){
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.GoogleMapAPIKey}`
    );
    const data = await response.json();

    if (data.status === 'OK') {
      const components = data.results[0].address_components;
      const city = components.find((c:any )=>
        c.types.includes('locality')
      )?.long_name;

      const country = components.find((c:any) =>
        c.types.includes('country')
      )?.long_name;

      return { city, country };
    } else {
      throw new Error('Geocoding failed');
    }
  };

}
