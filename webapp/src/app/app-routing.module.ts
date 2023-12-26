import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'login2', loadComponent: () => import('./components/example/example.component').then(c => c.ExampleComponent)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
