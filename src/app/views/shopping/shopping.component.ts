import { CustomService } from './../../services/custom.service';
import { CartItemsComponent } from './../../modules/cart/cart-items/cart-items.component';
import { Component, OnInit, Input } from '@angular/core';
import { ShopsComponent } from './shops/shops.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { ShopsFriendlyComponent } from './shops-friendly/shops-friendly.component';
import { App, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html'
})
export class ShoppingComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  tab1Root = ShopsComponent;
  tab2Root = VouchersComponent;
  tab3Root = ShopsFriendlyComponent;

  constructor(public nav: NavController, public appCtrl: App,public navParams:NavParams, public customService: CustomService) { }

  ngOnInit() {
  }

  changePage() {
    this.appCtrl.getRootNav().push(CartItemsComponent);
  }

  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content != undefined && this.search_content.length > 3) {
        this.customService.goToPageSearch(this.search_content, this.nav);
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }
}
