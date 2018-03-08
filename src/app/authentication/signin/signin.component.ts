import { CustomService } from './../../services/custom.service';
import { TimerComponent } from './../../components/timer/timer.component';
import { GeolocationService } from './../../services/geolocation.service';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { RegisterComponent } from "../register/register.component";
import { ToastController } from 'ionic-angular';
import { MainMenuComponent } from '../../layout/main-menu/main-menu.component';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiService } from '../../api/services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  @Input('username') username: string = 'quannm';
  @Input('password') password: string = '123456';

  latitude: any;
  longitude: any;
  is_logging: boolean = false;
  loader;

  constructor(
    public geolocationService: GeolocationService,
    public geolocation: Geolocation,
    private authenticationService: AuthenticationService,
    public nav: NavController,
    private toastCtrl: ToastController,
    private api: ApiService,
    private customService: CustomService,
    public loadingCtrl: LoadingController
  ) {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
  }

  ngOnInit() {
  }

  onLogin() {
    this.is_logging = true;
    this.loader.present();
    this.authenticationService.login(this.username, this.password).subscribe(resp => {
      this.is_logging = false;
      if (resp.status == false) {
        const toast = this.toastCtrl.create({
          message: 'Đăng nhập thất bại!',
          position: "bottom",
          duration: 3000
        });
        toast.present();
      } else {
        this.api.getProfile({}).subscribe(data => {
          this.loader.dismiss();
          localStorage.setItem('loggin_user', JSON.stringify(data));
          this.customService.user_current = data;
          this.authenticationService.setSession(resp);
          this.geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            localStorage.setItem("lat", this.latitude);
            localStorage.setItem("lng", this.longitude);
            this.geolocationService.setLocation(this.username, this.latitude, this.longitude);
          }).catch((error) => {
            console.log('Error getting location', error);
          });
          this.nav.setRoot(MainMenuComponent);
        })
      }
    });
  }

  onRegister() {
    this.nav.push(RegisterComponent);
  }
}
