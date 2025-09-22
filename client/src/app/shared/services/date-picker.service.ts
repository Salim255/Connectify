import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerComponent } from '../kits/date-picker/date-picker.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatePickerService {
  selectedDate: string | null = null;

  selectedDateSubject = new BehaviorSubject<string | null>(null);

  constructor(private modalCtrl:  ModalController) {}

  /**
   * Opens the date picker modal and resolves with the selected date (ISO string or null).
   */
  async OnDateModal(): Promise<string | null> {
    const modal = await this.modalCtrl.create({
      component: DatePickerComponent,
      backdropDismiss: true,         // allow closing by tapping backdrop
    });

    await modal.present();

    // Wait for dismissal and return the data
    const { data, role } = await modal.onDidDismiss<string>();
    if (role === 'confirm' && data) {
      return data; // selected date
    }
    return null; // dismissed without selection
  }

  async dismiss(data?: any, role: string = 'cancel'): Promise<void> {
    await this.modalCtrl.dismiss(data, role);
  }

  setSelectedDate(selectDate: string | null){
    this.selectedDateSubject.next(selectDate);
  }

  get selectedDate$(): Observable<string | null>{
    return this.selectedDateSubject.asObservable();
  }
}
