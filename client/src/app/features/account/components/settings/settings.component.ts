import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Profile } from "src/app/features/profile/model/profile.model";
import { AccountService } from "../../services/account.service";
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from "src/environments/environment.prod";

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
  accountProfile: Profile;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private accountHeaderService :AccountHeaderService ){
      this.accountProfile = this.accountService.accountProfile;

  }


  ngOnInit(): void {
    this.accountHeaderService.setHeaderHide(true);
    this.buildForm();
    //this.createMap();

  }
  onBack(): void{
    this.accountHeaderService.setHeaderHide(false);
  }

  buildForm(){
    this.editProfileForm = this.formBuilder.group({
      avatar: [this.accountProfile.avatarUrl, Validators.required],
      name: [this.accountProfile.name, Validators.required],
      age: [this.accountProfile.age, Validators.required],
      gender: [this.accountProfile.gender, Validators.required],
      location: [
        `${this.accountProfile?.location?.country}, ${this.accountProfile?.location?.city} `,
         Validators.required,
        ],
      bio: [this.accountProfile.bio, Validators.required],
      lifestyle: ['', Validators.required]
    })
  }

  async createMap() {
    console.log(this.mapRef)
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef?.nativeElement,
      apiKey: environment.GoogleMapAPIKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });


    this.newMap.setOnMapClickListener(async(event) => {
       console.log(event);


         const { latitude, longitude } = event;

      // Add marker at clicked location
      await this.newMap?.addMarker({
        coordinate: { lat: latitude, lng: longitude },
        title: 'Selected Location',
      });


        await this.newMap.addTileOverlay({
      opacity: 1,
      visible: true,
      zIndex: 2,
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    });



    });

    //this.newMap.addCircles()
  }

}
