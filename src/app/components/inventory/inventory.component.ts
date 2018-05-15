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

  constructor(public nav: NavController, public appCtrl: App, public inventorySerive: InventoriesService, private navParams: NavParams,
    public loadingCtrl: LoadingController, private customService: CustomService) {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  types: Array<{ item_type: string, title: string, image: string, badge: number, position: number }> = [];
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.types = [];
    if (this.inventoryType == undefined) {
      this.inventoryType = this.navParams.get("type");
    }
    if (this.ownerGuid == undefined) this.ownerGuid = this.navParams.get("ownerGuid");
    if (this.inventoryType === 'group') {
      this.group = this.navParams.get("obj");
      console.log(this.group);

    } else if (this.inventoryType === 'event') {
      this.event = this.navParams.get("obj");
    } else if (this.inventoryType === 'business') {
      this.page = this.navParams.get("obj");
    }
    if (this.ownerGuid == this.userCurrent.guid) {
      this.hidden_header = true;
    } else {
      this.hidden_header = false;
    }

    this.arrTagBadge = [
      { position: 0, item_type: 'new', title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png' },
      { position: 1, item_type: 'wishlist', title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png' },
      { position: 2, item_type: 'givelist', title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png' },
      { position: 3, item_type: 'expiry', title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png' },
      { position: 4, item_type: 'non_expiry', title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png' },
      { position: 5, item_type: 'voucher', title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png' },
      { position: 6, item_type: 'ticket', title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png' },
      { position: 7, item_type: 'expired', title: 'Hết hạn dùng', image: 'assets/imgs/ic_used_actived.png' },
      { position: 8, item_type: 'stored', title: 'Hết hạn lưu kho', image: 'assets/imgs/ic_expried.png' },
      { position: 9, item_type: 'nearly_expiry', title: '', image: '' },
      { position: 10, item_type: 'nearly_stored', title: '', image: '' }];


    this.arrTagBadge.forEach(e => {
      this.retryGetInventoriesByType(5, e);
    })

    this.retryGetInventory(5);
  }
  retryGetInventory(retry) {
    if (retry == 0) return;
    this.inventorySerive.getInventory(this.ownerGuid, this.inventoryType).subscribe(data => {
      if (data instanceof Array) {
        this.totalItem = data.length;
        data.forEach(e => {
          this.total += +e.quantity;
          this.totalPrice += +e.product_snapshot.display_price;
        });
        console.log(this.total);

      } else {
        this.totalItem = 0;
      }
    }, err => this.retryGetInventory(--retry))
  }

  retryGetInventoriesByType(retry, e) {
    if (retry == 0) return;
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, e.item_type, this.inventoryType).subscribe(data => {
      if (data && e.item_type != 'nearly_expiry' && e.item_type != 'nearly_stored') {
        this.types.push({ item_type: e.item_type, title: e.title, image: e.image, badge: data.length ? data.length : 0, position: e.position })
        // this.types.splice(e.position, 0, { item_type: e.item_type, title: e.title, image: e.image, badge: data.length ? data.length : 0, position: e.position });

        this.types.sort(this.compare);
      }
      // if (data && e.item_type != 'givelist' && e.item_type != 'new' && e.item_type != 'wishlist')
      //   this.totalItem += data.length ? data.length : 0;
      if (data && e.item_type == 'nearly_stored' && data.length) {
        this.badge_near_stored = data.length;
      }
      if (data && e.item_type == 'nearly_expiry' && data.length) {
        this.badge_near_expiry = data.length;
      }

    }, err => this.retryGetInventoriesByType(--retry, e));
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
          ownerGuid: this.ownerGuid, itemType: item_type,
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
        this.loadData();
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
