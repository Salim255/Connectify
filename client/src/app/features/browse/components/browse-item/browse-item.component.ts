import { Component, input } from "@angular/core";
import { Profile } from "src/app/features/profile/model/profile.model";
import { Router } from "@angular/router";
@Component({
  selector: 'app-browse-item',
  templateUrl: './browse-item.component.html',
  styleUrls: ['./browse-item.component.scss'],
  standalone: false
})

export class BrowseItemComponent {
  profile = input<Profile>();

  constructor(private router : Router ){}
  get profileAvatar(): string{
    return this.profile()?.avatarUrl ?? '';
  }

  onViewProfile(){
    this.router.navigate(['/profile'])
  }
}
