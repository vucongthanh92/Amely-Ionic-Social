import { AuthenticationInterceptor } from './authentication-interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ForgotComponent } from './forgot/forgot.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { VerifycodeComponent } from './verifycode/verifycode.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ForgotComponent, SigninComponent, SignoutComponent, VerifycodeComponent, RegisterComponent],
  entryComponents: [ForgotComponent, SigninComponent, SignoutComponent, VerifycodeComponent, RegisterComponent],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ]
})
export class AuthenticationModule { }