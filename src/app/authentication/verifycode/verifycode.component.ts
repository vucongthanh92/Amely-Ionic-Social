import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { SigninComponent } from "./../signin/signin.component";

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html'
})
export class VerifycodeComponent implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  onBackPress() {
    this.nav.setRoot(SigninComponent);
  }

  sendVerifyCode(){
    this.nav.setRoot(SigninComponent);
  }
}
