import { InventoriesService } from './../../services/inventories.service';
import { Component, OnInit, Input } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { InvenroyItemsComponent } from '../invenroy-items/invenroy-items.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  @Input('type') inventoryType: string;
  @Input('ownerGuid') ownerGuid: string;

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
  public totalItem: number = 0;
  constructor(public nav: NavController, public appCtrl: App, public inventorySerive: InventoriesService) { }
  types: Array<{ item_type: string, title: string, image: string, badge: number }> = [];
  ngOnInit() {
    this.arrTagBadge = [
      { item_type: 'wishlist', title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png' },
      { item_type: 'expired', title: '', image: '' },
      { item_type: 'non_expiry', title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png' },
      { item_type: 'expiry', title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png' },
      { item_type: 'voucher', title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png' },
      { item_type: 'ticket', title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png' },
      { item_type: 'new', title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png' },
      { item_type: 'nearly_expiry', title: '', image: '' },
      { item_type: 'nearly_stored', title: '', image: '' },
      { item_type: 'givelist', title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png' },
      { item_type: 'stored', title: '', image: '' }];

    this.arrTagBadge.forEach(e => {
      this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, e.item_type, this.inventoryType).subscribe(data => {
        if (data && e.item_type != 'expired' && e.item_type != 'nearly_expiry' && e.item_type != 'nearly_stored' && e.item_type != 'stored') {
          this.types.push({ item_type: e.item_type, title: e.title, image: e.image, badge: data.length ? data.length : 0 })
        }
        this.totalItem += data.length ? data.length : 0;

      });
    })

  }

  goToPage(value, item_type, title) {
    switch (value) {
      case 'items':
        this.appCtrl.getRootNav().push(InvenroyItemsComponent, { ownerGuid: this.ownerGuid, itemType: item_type, inventoryType: this.inventoryType, title: title });
        break;
      case 'default':
        break;
    }
  }
}
