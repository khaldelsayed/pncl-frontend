import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authServiceSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isUserAuthenticated();
    this.authServiceSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authServiceSub.unsubscribe();
  }
}
