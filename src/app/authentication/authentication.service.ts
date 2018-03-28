
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

}
