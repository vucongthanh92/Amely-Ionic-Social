import { InventoryMenuComponent } from './inventory-menu/inventory-menu.component';
import { SearchComponent } from './../../components/search/search.component';
import { App, NavController, NavParams, PopoverController, Popover } from 'ionic-angular';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit, Input } from '@angular/core';
import { InventoryPublicComponent } from './inventory-public/inventory-public.component';
import { InventoryPrivateComponent } from './inventory-private/inventory-private.component';
import { InventoryHistoryComponent } from './inventory-history/inventory-history.component';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html'
})

export class InventoriesComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  tabInventoryPrivate = InventoryPrivateComponent;
  tabInventoryPublic = InventoryPublicComponent;
  tabInventoryHistory = InventoryHistoryComponent;
  popover: Popover;
  public device_screen: string;

  constructor(
    public popoverCtrl: PopoverController, 
    public customService: CustomService, 
    public nav: NavController, 
    public appCtrl: App, 
    public navParams: NavParams) {
    this.device_screen = window.localStorage.getItem("device_screen");
    }

  ngOnInit() {
  }

  openPopover(myEvent) {
    this.popover = this.popoverCtrl.create(InventoryMenuComponent, { pop: this.popover});
    this.popover.present({
      ev: myEvent
    });
  }
   
  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content != undefined && this.search_content.length >= 3) {
        // this.customService.goToPageSearch(this.search_content, this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }
}
