import { formatDate } from "@angular/common";
import { Component, signal } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { DatePickerService } from "src/app/shared/services/date-picker.service";

@Component({
  selector: 'app-profile-setup-form',
  templateUrl: './profile-setup-form.component.html',
  styleUrls: ['./profile-setup-form.component.scss'],
  standalone: false
})

export class ProfileSetupFormComponent {
  profileForm!: FormGroup;
  showDatePicker =  signal<boolean>(false);
  selectedDateSubscription!: Subscription;

  onAgeFocus(event: any) {
    this.datePickerService.OnDateModal();
    //this.datePickerService.openDatePicker();
  }

  GENDERS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private datePickerService: DatePickerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildFom();
    this.subscribeToSelectedDate();
  }

  private subscribeToSelectedDate(){
    this.selectedDateSubscription = this.datePickerService.selectedDate$.subscribe(selectedDate =>{
      console.log(selectedDate, "Hello")
      if (selectedDate){
        this.profileForm.get('age')?.setValue(selectedDate);
      }
    }
    )
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
  get formattedAge(): string {
    const raw = this.profileForm.get('age')?.value;
    return raw ? formatDate(raw, 'dd / MM / yyyy', 'en-GB') : '';
  }
  ngOnDestroy(): void {
    this.selectedDateSubscription?.unsubscribe();
  }
}
