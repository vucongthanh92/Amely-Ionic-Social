import { Component, OnInit } from '@angular/core';
import { VerifycodeComponent } from "./../verifycode/verifycode.component";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  onSubmitRegister() {
    this.nav.setRoot(VerifycodeComponent);
  }
}
