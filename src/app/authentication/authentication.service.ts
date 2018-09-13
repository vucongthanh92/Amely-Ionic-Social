
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

  forgotPassword(username: string, mobile: string) {
    return this.api.forgotPassword({ username: username, mobile: mobile });
  }

  activation(code, username, phone) {
    return this.api.activeUser({ username: username, password: "", mobilelogin: phone, code: code, email: "" })
  }

  changePassword(password, mobile, username) {
    return this.api.changeForgotPassword({ new_password: password, mobile: mobile, username: username });
  }
}
