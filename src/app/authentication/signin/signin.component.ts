import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { SocialComponent } from '../../views/social/social.component';
import { ToastController, AlertController } from 'ionic-angular';
import { MainMenuComponent } from '../../layout/main-menu/main-menu.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  user = { username: 'quan5000', password: '123456' };
  
  constructor(
    private authenticationService: AuthenticationService, 
    public nav: NavController,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController
  ) { 
  }

  ngOnInit() { 
    // let a=25000;
    // console.log(a.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
    
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
        this.nav.setRoot(MainMenuComponent);
      }
    });
  }

  onRegister(){
    this.nav.push(RegisterComponent);
  }
}
