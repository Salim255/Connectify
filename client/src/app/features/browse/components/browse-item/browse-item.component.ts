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
   return "https://www.pexels.com/photo/photo-of-woman-near-chain-link-fence-2853592/";
  }

  onViewProfile(){
    const profile = this.profile();
    if (!profile) return;
    this.profileService.setProfile(profile);
    //this.router.navigate(['/profile'])
  }

}
