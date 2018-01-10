import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NavController, NavParams , Platform } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { SocialComponent } from '../../views/social/social.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public nav: NavController) { }

  ngOnInit() {
  }

  login () {
    this.nav.setRoot(SocialComponent);
  }

  onRegister(){
    this.nav.push(RegisterComponent);
  }
}
