import { BusinessComponent } from './../business/business.component';
import { EventComponent } from './../event/event.component';
import { GroupComponent } from './../group/group.component';
import { User } from './../../api/models/user';
import { Event } from './../../api/models/event';
import { Group } from './../../api/models/group';
import { InventoriesService } from './../../services/inventories.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, LoadingController } from 'ionic-angular';
import { InvenroyItemsComponent } from '../invenroy-items/invenroy-items.component';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Business } from '../../api/models/business';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  @Input('type') inventoryType: string;
  @Input('ownerGuid') ownerGuid: number;

  public userCurrent: User;
  public hidden_header: boolean;
  public group: Group;
  public event: Event;
  public page: Business;
  public badgeNew: number = 0;
  public badgeWishList: number = 0;
  public badgeExpired: number = 0;
  public badgeNonExpiry: number = 0;
  public badgeExpiry: number = 0;
  public badgeVoucher: number = 0;
  public badgeTicket: number = 0;
  public badgeNearlyExpiry: number = 0;
  public badgeNearlyStored: number = 0;
  public badgeGiveList: number = 0;
  public badgeStored: number = 0;
  arrTagBadge: any;
  badge_near_stored: number = 0;
  badge_near_expiry: number = 0;
  public totalItem: number = 0;
  public totalPrice: number = 0;
  public total: number = 0;

  isHasData: number = 0;
  isAdminGroup: any;
  isAdminEvent: any;

  public device_screen: string;

  constructor(
    public nav: NavController,
    public appCtrl: App,
    public inventorySerive: InventoriesService,
    private navParams: NavParams,
    public loadingCtrl: LoadingController,
    private customService: CustomService
  ) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
    this.isAdminGroup = this.navParams.get("isAdminGroup");
    this.isAdminEvent = this.navParams.get("isAdminEvent");
    this.device_screen = customService.checkDevices();
  }

  types: Array<{ item_type: string, title: string, image: string, badge: number, position: number }> = [];
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.types = [];
    this.total = 0;
    this.totalItem = 0;
    this.totalPrice = 0;
    if (this.inventoryType == undefined) {
      this.inventoryType = this.navParams.get("type");
    }
    if (this.ownerGuid == undefined) this.ownerGuid = this.navParams.get("ownerGuid");
    if (this.inventoryType === 'group') {
      this.group = this.navParams.get("obj");
      console.log(this.group);

    } else if (this.inventoryType === 'event') {
      this.event = this.navParams.get("obj");
      console.log(this.event);
    } else if (this.inventoryType === 'business') {
      this.page = this.navParams.get("obj");
    }
    if (this.ownerGuid == this.userCurrent.guid) {
      this.hidden_header = true;
    } else {
      this.hidden_header = false;
    }

    this.retryGetInventory(5);
  }
  retryGetInventory(retry) {
    if (retry == 0) return;
    this.inventorySerive.getInventory(this.ownerGuid, this.inventoryType, 1000).subscribe(data => {
      this.totalItem = data.total_quantity;
      this.total = data.total_type;
      this.totalPrice = data.total_price
      
      this.types = [
        { position: 0, item_type: 'new', title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png', badge:data.count.new},
        { position: 1, item_type: 'wishlist', title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png', badge: data.count.wishlist},
        { position: 2, item_type: 'givelist', title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png', badge: data.count.givelist},
        { position: 3, item_type: 'expiry', title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png', badge: data.count.expiry },
        { position: 4, item_type: 'non_expiry', title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png', badge: data.count.non_expiry },
        { position: 5, item_type: 'voucher', title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png', badge: data.count.voucher },
        { position: 6, item_type: 'ticket', title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png', badge: data.count.ticket},
        { position: 7, item_type: 'expired', title: 'Hết hạn dùng', image: 'assets/imgs/ic_used_actived.png', badge: data.count.expired},
        { position: 8, item_type: 'stored', title: 'Hết hạn lưu kho', image: 'assets/imgs/ic_expried.png', badge: data.count.stored},
        // { position: 9, item_type: 'nearly_expiry', title: '', image: '', badge: data.count.nearly_expiry},
        // { position: 10, item_type: 'nearly_stored', title: '', image: '', badge: data.count.nearly_stored}
      ]
      this.badge_near_stored = data.count.nearly_stored;
      this.badge_near_expiry = data.count.nearly_expiry;
    }, err => this.retryGetInventory(--retry))
  }


  compare(a, b) {
    if (a.position > b.position)
      return 1;
    if (a.position < b.position)
      return -1;
    return 0;
  }

  goToPage(value, item_type, title) {
    switch (value) {
      case 'items':
        this.appCtrl.getRootNav().push(InvenroyItemsComponent, {
          ownerGuid: this.ownerGuid, itemType: item_type, isAdminGroup: this.isAdminGroup, isAdminEvent: this.isAdminEvent,
          inventoryType: this.inventoryType, title: title, callback: this.myCallbackFunction
        });
        break;
      case 'default':
        break;
    }
  }

  myCallbackFunction = (values) => {
    return new Promise((resolve, reject) => {
      if (values) {
        // this.loadData();
        this.nav.getActive().component;
      }
      resolve();
    });
  }
  openInventory() {

  }
  openOAProfile() {
    this.appCtrl.getRootNav().push(BusinessComponent, { guid: this.page.guid })
  }
  openEventProfile() {
    this.appCtrl.getRootNav().push(EventComponent, { event_guid: this.event.guid })
  }
  openGroupProfile() {
    this.appCtrl.getRootNav().push(GroupComponent, { groupGuid: this.group.guid, reloadCallback: this.reloadCallback })
  }
  reloadCallback = (_params) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  formatCurrency() {
    return this.customService.formatCurrency(this.totalPrice + "", this.userCurrent.usercurrency);
  }

  dismiss() {
    this.nav.pop();
  }
}
