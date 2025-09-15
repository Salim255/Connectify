import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private authService: AuthService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscribeToUserIsAuthenticated()
  }

  subscribeToUserIsAuthenticated(){
    this.authenticatedUserSubscription = this.authService.userIsAuthenticated.subscribe((isAuthenticated) => {
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
