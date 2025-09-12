import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../../services/account.service";
import { Profile } from "src/app/features/profile/model/profile.model";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: false
})

export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  accountProfile: Profile;

  constructor(
    private photoService: PhotoService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ){
    this.accountProfile = this.accountService.accountProfile;
  }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.accountProfile);
  }


  buildForm(){
    this.editProfileForm = this.formBuilder.group({
      avatar: [this.accountProfile.avatarUrl, Validators.required],
      name: [this.accountProfile.name, Validators.required],
      age: [this.accountProfile.age, Validators.required],
      gender: [this.accountProfile.gender, Validators.required],
      location: [`${this.accountProfile?.location?.country}, ${this.accountProfile?.location?.city} `, Validators.required],
      bio: [this.accountProfile.bio, Validators.required],
      lifestyle: ['', Validators.required]
    })
  }

  onFileSelected(event: any){

  }

  onEditPhoto(){
    console.log("hello from take photo")
  }
}
