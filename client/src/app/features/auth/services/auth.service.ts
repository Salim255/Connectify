import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../model/user.model";

@Injectable({providedIn: "root"})

export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  private _isAuthenticated = false;

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  login() {
    this._isAuthenticated = true;
  }

  logout() {
    this._isAuthenticated = false;
  }

  userIsAuthenticated() {
   return this.user.asObservable();
  }
}
