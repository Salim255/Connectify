import { Component, OnInit } from "@angular/core";
import { PAGES } from "src/app/shared/components/header/header.component";
import { ProfileService } from "./services/profile.service";
import { Subscription } from "rxjs";
import { Profile } from "./model/profile.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  pageName: PAGES = PAGES.PROFILE;
  profile: Profile | null = null;
  private profileSubscription!: Subscription;
  constructor(private profileService: ProfileService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this. subscribeToProfile();
  }

  subscribeToProfile(){
    this.profileSubscription = this.profileService.getProfile$.subscribe(profile => {
      console.log(profile);
      this.profile = profile;
    })
  }

  get profileAvatar(){
    return this.profile?.avatarUrl;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.profileSubscription?.unsubscribe();
    console.log('destroy')
  }
}
