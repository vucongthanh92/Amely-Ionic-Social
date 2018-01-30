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
  arrTagBadge = [];
  constructor(public nav: NavController, public appCtrl: App, public inventorySerive: InventoriesService) { }

  ngOnInit() {
    this.arrTagBadge.push('wishlist');
    this.arrTagBadge.push('expired');
    this.arrTagBadge.push('non_expiry');
    this.arrTagBadge.push('expiry');
    this.arrTagBadge.push('voucher');
    this.arrTagBadge.push('ticket');
    this.arrTagBadge.push('new');
    this.arrTagBadge.push('nearly_expiry');
    this.arrTagBadge.push('nearly_stored');
    this.arrTagBadge.push('givelist');
    this.arrTagBadge.push('stored');

    this.arrTagBadge.forEach(e=>{
      this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'wishlist', this.inventoryType).subscribe(data => {
        if (data)
          this.badgeWishList = data.length
      });
    })
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'wishlist', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeWishList = data.length
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'expired', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeExpired = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'non_expiry', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeNonExpiry = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'expiry', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeExpiry = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'voucher', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeVoucher = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'ticket', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeTicket = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'new', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeNew = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'nearly_expiry', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeNearlyExpiry = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'nearly_stored', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeNearlyStored = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'givelist', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeGiveList = data.length;
    });
    this.inventorySerive.getInventoriesByType(0, 9999, this.ownerGuid, 'stored', this.inventoryType).subscribe(data => {
      if (data)
        this.badgeWishList = data.length;
    });
  }

  goToPage(value) {
    switch (value) {
      case 'items':
        this.appCtrl.getRootNav().push(InvenroyItemsComponent);
        break;
      case 'default':
        break;
    }
  }
}
