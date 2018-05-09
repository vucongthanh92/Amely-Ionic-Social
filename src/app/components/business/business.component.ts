import { InventoryComponent } from './../inventory/inventory.component';
import { Component, OnInit } from '@angular/core';
import { App, NavParams, NavController, PopoverController } from 'ionic-angular';
import { GiftComponent } from '../gift/gift.component';
import { BusinessService } from '../../services/business.service';
import { Business } from '../../api/models/business';
import { CustomService } from '../../services/custom.service';
import { BusinessMenuComponent } from './business-menu/business-menu.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {
  private business_guid: number;
  public page: Business;
  is_owner: boolean;
  constructor(public nav: NavController, public appCtrl: App, private nav_param: NavParams, private service: BusinessService
    , private customService: CustomService, public popoverCtrl: PopoverController) {
    this.business_guid = this.nav_param.get('guid');
  }

  ngOnInit() {
    this.loadData(5);

  }
  loadData(retry) {
    if (retry == 0) {
      alert("Kết nối máy chủ thất bại");
      return;
    }
    this.service.getBusinessPage(this.business_guid).subscribe(
      data => {
        this.page = data;
        this.is_owner = this.customService.user_current.guid == data.owner.guid;
      },
      err => {
        this.loadData(--retry)
      })
  }

  likePage(isLike: boolean) {
    if (isLike) {
      this.customService.like('business', this.business_guid).subscribe(data => {
        if (data.status) {
          this.page.followed = true;
        }
      });
    } else {
      this.customService.unlike('business', this.business_guid).subscribe(data => {
        if (data.status) {
          this.page.followed = false;
        }
      });
    }
  }
  newfeedsPage = true;

  goInventory() {
    this.appCtrl.getRootNav().push(InventoryComponent, { type: 'business', ownerGuid: this.business_guid, obj: this.page });
  }

  goToPage(value, page) {
    switch (value) {
      case 'gift':
        page.chat_type = "business";
        page.from = this.customService.user_current.fullname;
        page.to = page.title;
        this.nav.push(GiftComponent, { param: page });
        break;
      default:
        break;
    }
  }

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create(BusinessMenuComponent);
    popover.present({
      ev: myEvent
    });
  }

  dismiss() {
    this.nav.pop();
  }

}
