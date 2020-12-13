import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'editor', component: EditorComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule {

}
