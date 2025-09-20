import { Injectable } from "@angular/core";
import { ProfileService } from "../../profile/services/profile.service";
import { Profile } from "../../profile/model/profile.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AccountService {
  accountProfileSubject = new BehaviorSubject<Profile | null>(null);

  constructor(){}

  setAccountProfile(profile: Profile): void{
    this.accountProfileSubject.next(profile);
  }

  get getAccountProfile(): Observable<Profile | null>{
    return this.accountProfileSubject.asObservable();
  }
}
