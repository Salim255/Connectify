import { Component, OnInit } from "@angular/core";
import { AccountHeaderService } from "../../services/account-header.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Profile } from "src/app/features/profile/model/profile.model";
import { AccountService } from "../../services/account.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: false
})

export class SettingsComponent implements OnInit {
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
}
