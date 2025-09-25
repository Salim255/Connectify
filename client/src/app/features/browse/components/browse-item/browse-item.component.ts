import { Component, input } from "@angular/core";
import { Profile } from "src/app/features/profile/model/profile.model";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/features/profile/services/profile.service";

@Component({
  selector: 'app-browse-item',
  templateUrl: './browse-item.component.html',
  styleUrls: ['./browse-item.component.scss'],
  standalone: false
})
export class BrowseItemComponent {
  profile = input<Profile>();

  constructor(
    private profileService: ProfileService,
    private router : Router,
  ){}

  get profileAvatar(): string{
   // return this.profile()?.avatarUrl ?? '';
   //return "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D";
   return '';
  }

  onViewProfile(){
    const profile = this.profile();
    if (!profile) return;
    this.profileService.setProfile(profile);
    //this.router.navigate(['/profile'])
  }

}
