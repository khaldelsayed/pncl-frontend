import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class AngularMaterialModule {
}
