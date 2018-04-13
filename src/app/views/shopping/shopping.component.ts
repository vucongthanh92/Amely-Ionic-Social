import { SearchComponent } from './../../components/search/search.component';
import { CustomService } from './../../services/custom.service';
import { CartItemsComponent } from './../../modules/cart/cart-items/cart-items.component';
import { Component, OnInit, Input } from '@angular/core';
import { ShopsComponent } from './shops/shops.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { ShopsFriendlyComponent } from './shops-friendly/shops-friendly.component';
import { App, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ShoppingMenuComponent } from './shopping-menu/shopping-menu.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html'
})
export class ShoppingComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  check_screen: string;
  tab1Root = ShopsComponent;
  tab2Root = VouchersComponent;
  tab3Root = ShopsFriendlyComponent;

  constructor(
    public nav: NavController, 
    public appCtrl: App, 
    public navParams: NavParams, 
    public customService: CustomService, 
    public popoverCtrl: PopoverController) {
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

  changePage() {
    this.appCtrl.getRootNav().push(CartItemsComponent);
  }
  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(ShoppingMenuComponent);
    popover.present({
      ev: myEvent
    });
  }
  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content != undefined && this.search_content.length > 3) {
        // this.customService.goToPageSearch(this.search_content, this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }
}
