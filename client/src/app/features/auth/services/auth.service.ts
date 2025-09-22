import { Injectable } from "@angular/core";
import { BehaviorSubject, from, map, Observable, tap } from "rxjs";
import { User } from "../model/user.model";
import { Preferences } from '@capacitor/preferences';
import { AuthHttpService, AuthResponse, LoginPayload, SignupPayload } from "./auth-http.service";
import { ProfileService } from "../../profile/services/profile.service";
import { SocketCoreService } from "src/app/socket/services/socket-presence.service";

@Injectable({providedIn: "root"})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  activeLogoutTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private socketCoreService: SocketCoreService,
    private profileService : ProfileService,
    private authHttpService: AuthHttpService,
  ){}

  login(data: LoginPayload): Observable<AuthResponse>{
   return this.authHttpService.logIn(data).pipe(
    tap((result) => {
      if (result?.data?.user?.id){
        this.setAuthData(result);
        this.profileService.fetchProfile().subscribe();
      }
    })
   );
  }

  signup(data: SignupPayload): Observable<AuthResponse>{
    return this.authHttpService.signup(data).pipe(
      tap((result) => {
        if (result?.data?.user?.id){
          this.setAuthData(result);
          this.profileService.fetchProfile().subscribe();
        }
      })
    )
  }
  private autoLogout(duration: number): void {
      if (this.activeLogoutTimer) {
        clearTimeout(this.activeLogoutTimer);
      }
      this.activeLogoutTimer = setTimeout(() => {
        this.logout();
      }, duration);
    }

  autoLogin(): Observable<boolean> {
    return from(Preferences.get({ key: 'authData' })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }

        const parseData = JSON.parse(storedData.value) as {
          id: string;
          _token: string;
          tokenExpirationDate: string;
        };

        const expirationTime = new Date(parseData.tokenExpirationDate);

        if (expirationTime <= new Date()) {
          return null;
        }

        const userToReturn = new User(
          parseData.id,
          parseData._token,
          expirationTime,
        );

        return userToReturn;
      }),
      tap((userToReturn) => {
        if (userToReturn) {
          this.user.next(userToReturn);
          this.autoLogout(userToReturn.tokenDuration);
        }
      }),
      map((userToReturn) => {
        return !!userToReturn;
      })
    );
  }

  private removeStoredData = async () => {
    await Preferences.remove({ key: 'authData' });
  };

  get userIsAuthenticated(): Observable<boolean> {
   return this.user.asObservable().pipe(
    map((user) => {
      if (user){
        return  !!user.token;
      } else {
        return false;
      }
    })
   );
  }

  async logout(): Promise<void> {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }

    this.user.next(null);
    this.socketCoreService.disconnect();
    this.removeStoredData();
  }

  get userId(): Observable<string | null> {
    return this.user.asObservable().pipe(
      map((user) => user?.id ?? null)
    );
  }

   private setAuthData(authData: AuthResponse) {
    const expirationTime = new Date(new Date().getTime() + authData.expireIn);
    const buildUser = new User(
      authData.data.user.id,
      authData.token,
      expirationTime,
    );

    this.user.next(buildUser);
    this.storeAuthData(buildUser);
  }

  get getUserId(){
    return this.user.value?.id;
  }
  private storeAuthData = async (dataToStore: User) => {
    const data = JSON.stringify(dataToStore);
    await Preferences.set({
      key: 'authData',
      value: data,
    });
  };
}
