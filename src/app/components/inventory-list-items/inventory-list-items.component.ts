import { InvenroyItemsComponent } from './../invenroy-items/invenroy-items.component';
import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'app-inventory-list-items',
  templateUrl: './inventory-list-items.component.html'
})
export class InventoryListItemsComponent implements OnInit {

  @Input('inventory_type') inventory_type: any;

  @Input('badgeNew') badgeNew: number;
  @Input('badgeWishList') badgeWishList: number;
  @Input('badgeExpired') badgeExpired: number;
  @Input('badgeNonExpiry') badgeNonExpiry: number;
  @Input('badgeExpiry') badgeExpiry: number;
  @Input('badgeVoucher') badgeVoucher: number;
  @Input('badgeTicket') badgeTicket: number;
  @Input('badgeNearlyExpiry') badgeNearlyExpiry: number;
  @Input('badgeNearlyStored') badgeNearlyStored: number;
  @Input('badgeGiveList') badgeGiveList: number;
  @Input('badgeStored') badgeStored: number;
  types: Array<{ title: string, image: string, badge:number}>;

  constructor(public nav: NavController, public appCtrl: App) { }

  ngOnInit() {
    this.initTypes();
  }

  initTypes() {
    this.types = [
      { title: 'Mới nhập', image: 'assets/imgs/ic_inventory_new.png', badge: this.badgeNew },
      { title: 'Yêu thích', image: 'assets/imgs/ic_inventory_like.png', badge: this.badgeWishList},
      { title: 'Muốn cho đi', image: 'assets/imgs/ic_inventory_wanna_send.png', badge: this.badgeNew},
      { title: 'Có hạn dùng', image: 'assets/imgs/ic_inventory_expired.png', badge: this.badgeNew},
      { title: 'Không hạn dùng', image: 'assets/imgs/ic_inventory_no_expired.png', badge: this.badgeNew },
      { title: 'E-Voucher', image: 'assets/imgs/ic_inventory_voucher.png', badge: this.badgeNew},
      { title: 'E-Ticket', image: 'assets/imgs/ic_inventory_ticket.png', badge: this.badgeNew},
    ]
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
