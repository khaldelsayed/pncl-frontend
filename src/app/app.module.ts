import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { FirebaseModule } from './modules/firebase.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditorComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    AngularMaterialModule,
    FirebaseModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
