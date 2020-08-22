import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';



@NgModule({
  declarations: [LoginComponent, SigninComponent, AuthComponent],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class MainModule { }
