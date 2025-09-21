import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Profile } from "src/app/features/profile/model/profile.model";
import { AccountService } from "../../services/account.service";
import { GoogleMap } from '@capacitor/google-maps';
import { Coordinates, GeolocationService } from "src/app/core/services/geolocation/geolocation.service";
import { GoogleMapService } from "src/app/core/services/geolocation/google-map.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: false
})
export class SettingsComponent implements OnInit {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  editProfileForm!: FormGroup;
  accountProfile: Profile | null = null;

  currentMarker: string | null = null;
  currentLocation: Coordinates | null = null;


  locationNameSubscription!: Subscription;
  accountProfileSubscription!: Subscription;

  constructor(
    private googleMapService: GoogleMapService,
    private geolocationService: GeolocationService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private accountHeaderService :AccountHeaderService ){
      this.geolocationService.getCurrentCoordinates().then(coords => {
        this.currentLocation = { latitude: coords.latitude, longitude: coords.longitude };
        console.log('Current location:', this.currentLocation);
      }).catch(error => {
        console.error('Error getting location:', error);
      });
  }

  ngOnInit(): void {
    this.accountHeaderService.setHeaderHide(true);
    this.buildForm();
    this.subscribeToLocationName();
    this.subscribeToAccountProfile();
  }


  subscribeToAccountProfile(){
    this.accountProfileSubscription = this.accountService.getAccountProfile$.subscribe(profile => {
      console.log(profile, "Hello world✅✅");
      this.accountProfile = profile;
    })
  }

  subscribeToLocationName(){
    this.locationNameSubscription = this.googleMapService.getLocationNAmeSubject$.subscribe(
      locationName => {
        console.log('Location name updated:', locationName);
        if (locationName) {
          this.editProfileForm.patchValue({
            location: `${locationName?.country}, ${locationName?.city}`
          });
        }
      }
    )
  }
  onBack(): void{
    this.accountHeaderService.setHeaderHide(false);
  }

  buildForm(){
    this.editProfileForm = this.formBuilder.group({
      avatar: [this.accountProfile?.avatarUrl, Validators.required],
      name: [this.accountProfile?.name, Validators.required],
      age: [this.accountProfile?.age, Validators.required],
      gender: [this.accountProfile?.gender, Validators.required],
      location: [
        `${this.accountProfile?.location?.country}, ${this.accountProfile?.location?.city} `,
        Validators.required,
      ],
      bio: [this.accountProfile?.bio, Validators.required],
      lifestyle: ['', Validators.required]
    })
  }

  async createMap() {
    await this.googleMapService.createLocationPickerModal();
  }

  ngOnDestroy(): void {
    this.locationNameSubscription?.unsubscribe();
  }

}
