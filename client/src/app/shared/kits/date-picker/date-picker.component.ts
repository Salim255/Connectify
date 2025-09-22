import { Component } from '@angular/core';
import { DatePickerService } from '../../services/date-picker.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: false
})
export class DatePickerComponent {
  minDate: string;
  maxDate: string;
  selectedDate: string | null = null;

  constructor(private datePicker: DatePickerService) {
    const today = new Date();

    // Minimum date: e.g. 100 years ago (so you don't allow unrealistic ages)
    const min = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    // Maximum date: today minus 18 years
    const max = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    this.minDate = min.toISOString().split('T')[0]; // YYYY-MM-DD
    this.maxDate = max.toISOString().split('T')[0];
  }

  selectDate(event: any) {
    const value = event.detail.value;
    this.selectedDate = value;
  }

  onDismiss(){
    this.datePicker.setSelectedDate(this.selectedDate);
    this.datePicker.dismiss();
  }
}
