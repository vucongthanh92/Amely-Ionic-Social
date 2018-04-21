import { PaymentService } from './../../services/payment.service';
import { SearchComponent } from './../../components/search/search.component';
import { MenuController, PopoverController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { OffersComponent } from './offers/offers.component';
import { NearByComponent } from './near-by/near-by.component';
import { EventsComponent } from './events/events.component';
import { CustomService } from '../../services/custom.service';
import { App, NavController, NavParams } from 'ionic-angular';
import { SocialMenuComponent } from './social-menu/social-menu.component';
import { QuickPayListItemComponent } from '../../modules/quick-pay/quick-pay-list-item/quick-pay-list-item.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',

})
export class SocialComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  check_screen: string;
  tab1Root = NewsFeedComponent;
  tab2Root = OffersComponent;
  tab3Root = NearByComponent;
  tab4Root = EventsComponent;
  tab5Root = NearByComponent;
  tab6Root = EventsComponent;

  constructor(
    public nav: NavController, public appCtrl: App, public navParams: NavParams,
    public menuCtrl: MenuController,
    public customService: CustomService,
    private popoverCtrl: PopoverController,
    private paymentService: PaymentService
  ) {
    // this.menuCtrl.enable(true, 'mainMenu');
    var ratio = window.devicePixelRatio || 1;
    var screen = {
      width: window.screen.width * ratio,
      height: window.screen.height * ratio
    };
    if (screen.width == 1125 && screen.height == 2436) {
      this.check_screen = "top_navigation_iphonex";
    }
    else {
      this.check_screen = "top_navigation_default";
    }
  }
  ngOnInit() {
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(SocialMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content != undefined && this.search_content.length > 3) {
        // this.customService.goToPageSearch(this.search_content,this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }

  payment() {
    let code = "cnZSY0NwZTRmaUxtc29pU1dRb3pORGdEWTd4ZTBRemU3K2Y4alVmSG1udz0";
    this.paymentService.getTempOrder(code).subscribe(data => {
      // check update profile        

      this.paymentService.payment_qr_data = data;
      this.paymentService.getPaymentMethod().subscribe(data => {
        this.paymentService.payment_order_post = data;
        this.appCtrl.getRootNav().push(QuickPayListItemComponent)
      });

    })
    // this.barcodeScanner.scan().then((barcodeData) => {
    //   let loading = this.loadingCtrl.create({
    //     content: 'Please wait...',
    //     enableBackdropDismiss: true
    //   });

    //   loading.present();
    //   this.paymentService.getTempOrder(barcodeData.text).subscribe(data => {
    //     // check update profile        
    //     if (!this.customService.user_current.address || !this.customService.user_current.province || !this.customService.user_current.district || !this.customService.user_current.ward) {
    //       this.requestUpdateProfile()
    //       loading.dismiss();
    //     } else {
    //       this.paymentService.payment_qr_data = data;
    //       this.paymentService.getPaymentMethod().subscribe(data => {
    //         this.paymentService.payment_order_post = data;
    //         loading.dismiss();
    //         this.appCtrl.getRootNav().push(QuickPayListItemComponent)
    //       });
    //     }
    //   })
    // }, (err) => {
    //   this.customService.toastMessage("Mã QR không hợp lệ hoặc đã hết hạn", 'bottom', 4000);
    // });
  }

}
