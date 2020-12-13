import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private userId: string;
  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(public angularFireAuth: AngularFireAuth, private router: Router, public ngZone: NgZone) {
  }

  loginWithGoogle(): void {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(googleAuthProvider)
      .then(result => {
        this.userId = result.user.uid;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.saveAuthData(this.userId);
        this.router.navigate([ 'editor' ]);
      });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate([ '/' ]);
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserId(): string {
    return this.userId;
  }

  private saveAuthData(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(): void {
    localStorage.removeItem('userId');
  }

  loadAuthData(): void {
    const storageUserId = localStorage.getItem('userId');
    if (storageUserId) {
      this.isAuthenticated = true;
      this.userId = storageUserId;
      this.authStatusListener.next(true);
      this.router.navigate([ 'editor' ]);
    }
  }
}

