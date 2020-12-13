import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authService.isUserAuthenticated();
    if (!isAuth) {
      this.router.navigate([ '' ]);
    }
    return isAuth;
  }
}
