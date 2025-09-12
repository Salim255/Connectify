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
      avatar: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      location: ['', Validators.required],
      bio: ['', Validators.required],
    })
  }
}
