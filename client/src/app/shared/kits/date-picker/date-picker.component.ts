import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-content>
      <ion-datetime
        presentation="date"
        [preferWheel]="true"
        (ionChange)="selectDate($event)">
      </ion-datetime>
    </ion-content>
  `,
  styleUrls: ['./date-picker.component.scss'],
  standalone: false
})
export class DatePickerComponent {
  constructor(private popoverCtrl: PopoverController) {}

  selectDate(event: any) {
    const value = event.detail.value;
    this.popoverCtrl.dismiss(value);
  }
}
