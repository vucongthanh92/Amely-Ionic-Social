import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot/forgot.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { VerifycodeComponent } from './verifycode/verifycode.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ForgotComponent, SigninComponent, SignoutComponent, VerifycodeComponent]
})
export class AuthenticationModule { }
