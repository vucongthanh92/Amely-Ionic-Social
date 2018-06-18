import { CustomService } from './../../../services/custom.service';
import { Shop } from './../../../api/models/shop';
import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { ShopComponent } from '../../../components/shop/shop.component';
import { ShoppingsService } from '../../../services/shoppings.service';

@Component({
  selector: 'app-shops-friendly',
  templateUrl: './shops-friendly.component.html'
})
export class ShopsFriendlyComponent implements OnInit {
  fakeUsers: Array<any> = new Array(10);
  public users: Array<User>;
  public shops: Array<Shop>;
  constructor(public nav: NavController, public appCtrl: App, public shoppingsService: ShoppingsService, private customService: CustomService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {

    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();

    if (retry == 0) {
      // loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
      this.shoppingsService.getFriendlyShop().subscribe(data => {
        if (data.shops instanceof Array) {
          
          // loading.dismiss();
          this.shops = data.shops;
          this.users = data.owners;
        }else {
          this.shops = [];
          this.users = [];
        }
      }, err => this.loadData(--retry));
   
  }
  goToPage(value, guid) {
    switch (value) {
      case 'shop':
        this.appCtrl.getRootNav().push(ShopComponent, { guid: guid });
        break;
      default:
        break;
    }
  }

}
