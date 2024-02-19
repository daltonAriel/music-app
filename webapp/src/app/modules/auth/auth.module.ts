import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { BaseComponent } from './components/base/base.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    BaseComponent,
  ],
  imports: [
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [],
})
export class AuthModule { }
