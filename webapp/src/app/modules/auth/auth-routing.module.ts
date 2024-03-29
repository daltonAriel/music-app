import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';


const routes: Routes = [
  {
    path: '', component: BaseComponent, children: [
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent), data: { route: 'login' } },
      { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(c => c.SignupComponent), data: { route: 'signup' } },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
