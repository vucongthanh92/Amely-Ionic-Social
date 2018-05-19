
import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class AuthenticationService {
  constructor(private api: ApiService) {

  }

  login(username: string, password: string) {
    return this.api.login({ username, password }).pipe();
  }

  public setSession(authResponse) {
    localStorage.setItem('token', authResponse.token);
    return true;
  }

  forgotPassword(email: string) {
    return this.api.forgotPassword({ email: email });
  }

  activation(code, email) {
    return this.api.activeUser({ username: "", password: "", mobilelogin: "", code: code, email: email })
  }

  changePassword(password, email) {
    return this.api.changeForgotPassword({ new_password: password, email: email });
  }
}
