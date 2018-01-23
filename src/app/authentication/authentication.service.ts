
import { Injectable } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class AuthenticationService {
  constructor(private api: ApiService) {
    
  }
  
  login(username: string, password: string) {
    console.log('auth service send login');
    
    return this.api.login({ username, password }).pipe();
  }

  public setSession(authResponse) {
    localStorage.setItem('token', authResponse.token);
    return true;
  }

}
