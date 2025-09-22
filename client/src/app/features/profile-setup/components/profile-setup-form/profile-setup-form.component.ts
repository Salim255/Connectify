import { Component, signal } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile-setup-form',
  templateUrl: './profile-setup-form.component.html',
  styleUrls: ['./profile-setup-form.component.scss'],
  standalone: false
})

export class ProfileSetupFormComponent {
  profileForm!: FormGroup;
  showDatePicker =  signal<boolean>(false);

  onAgeFocus() {
    this.showDatePicker.set(true);
  }
  GENDERS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildFom();
  }

  private ageValidator(minAge = 18, maxAge = 100): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value == null || value === '') {
        return null;
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
    console.log(this.profileForm.value);
  }
}
