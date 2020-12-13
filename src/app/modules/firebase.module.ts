import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports: [
    AngularFireAuthModule
  ]
})
export class FirebaseModule {
}
