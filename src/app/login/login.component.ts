import { Component } from '@angular/core';
import { AuthService } from '../core/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthService) {
  }

  onLogin(): void {
    this.isLoading = true;
    this.authService.loginWithGoogle();
  }
}
