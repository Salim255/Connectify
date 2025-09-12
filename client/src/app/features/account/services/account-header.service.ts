import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class AccountHeaderService {
  hideHeaderSubject = new BehaviorSubject<boolean>(false);

  constructor(){}

  setHeaderHide(status: boolean): void{
    this.hideHeaderSubject.next(status);
  }

  get getHideHeaderStatus$(): Observable<boolean>{
    return this.hideHeaderSubject.asObservable();
  }
}
