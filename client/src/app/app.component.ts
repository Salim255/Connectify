import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  private previousAuthState: boolean = false;
  private authenticatedUserSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.subscribeToUserAuthentication()
  }

  subscribeToUserAuthentication(){
    this.authenticatedUserSubscription = this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
      console.log(isAuthenticated, "Hello from here", this.previousAuthState);
      if (!isAuthenticated && this.previousAuthState !== isAuthenticated){
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.authenticatedUserSubscription?.unsubscribe();
  }
}
