import { Component, input } from "@angular/core";
import { Profile } from "src/app/features/profile/model/profile.model";

@Component({
  selector: 'app-browse-item',
  templateUrl: './browse-item.component.html',
  styleUrls: ['./browse-item.component.scss'],
  standalone: false
})

export class BrowseItemComponent {
  profile = input<Profile>();

  get profileAvatar(): string{
    return this.profile()?.avatarUrl ?? '';
  }
}
