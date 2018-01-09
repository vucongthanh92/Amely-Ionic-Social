import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NavController, NavParams , Platform } from 'ionic-angular';
import { NewsFeedComponent } from '../../views/social/news-feed/news-feed.component';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, public nav: NavController) { }

  ngOnInit() {
  }

  login () {
    this.nav.setRoot(NewsFeedComponent);
  }

  onRegister(){
    this.nav.push(RegisterComponent);
  }
}
