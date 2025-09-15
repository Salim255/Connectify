import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

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

  private ageValidator(minAge = 18, maxAge = 100): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value == null || value === '') {
        return null; // let `required` handle empty case
      }

      if (isNaN(value) || value < minAge || value > maxAge) {
        return { ageInvalid: { min: minAge, max: maxAge, actual: value } };
      }

      return null;
    };
  }

  private buildFom(){
    this.profileForm = this.formBuilder.group({
      name: [null, Validators.required],
      age: [null, [Validators.required, this.ageValidator(18, 100)]],
      photo: [null, Validators.required],
      gender: [null, Validators.required],
    });
  }

  onSubmit(){

  }
}
