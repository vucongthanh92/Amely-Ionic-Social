import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams , Platform } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { SocialComponent } from '../../views/social/social.component';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  user = { username: '', password: '' };

  constructor(
    private authenticationService: AuthenticationService, 
    public nav: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authenticationService.login(this.user.username, this.user.password).subscribe(resp => {
      if (resp.status == false) {
        const toast = this.toastCtrl.create({
          message: 'Đăng nhập thất bại!',
          position: "bottom",
          duration: 3000
        });

        toast.present();
      } else {
        this.authenticationService.setSession(resp);
        this.nav.setRoot(SocialComponent);    
      }
    });
  }

  onRegister(){
    this.nav.push(RegisterComponent);
  }
}
