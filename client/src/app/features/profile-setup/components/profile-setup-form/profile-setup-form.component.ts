import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-profile-setup-form',
  templateUrl: './profile-setup-form.component.html',
  styleUrls: ['./profile-setup-form.component.scss'],
  standalone: false
})

export class ProfileSetupFormComponent {
  profileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildFom();
  }

  private buildFom(){
    this.profileForm = this.formBuilder.group({
      name: [''],
      age: [''],
      photo: ['']
    });
  }

  onSubmit(){

  }
}
