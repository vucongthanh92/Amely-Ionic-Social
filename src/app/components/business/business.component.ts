import { InventoryComponent } from './../inventory/inventory.component';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { GiftComponent } from '../gift/gift.component';
import { BusinessService } from '../../services/business.service';
import { Business } from '../../api/models/business';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {
  private business_guid: number;
  public page: Business;
  is_owner: boolean;
  constructor(public nav: NavController, public appCtrl: App, private nav_param: NavParams, private service: BusinessService
    , private customService: CustomService) {
    this.business_guid = nav_param.get('guid');
  }

  ngOnInit() {
    this.service.getBusinessPage(this.business_guid).subscribe(data => {
      this.page = data;
      this.is_owner = this.customService.user_current.guid == data.owner.guid;      
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

  goToPage(value) {
    switch (value) {
      case 'gift':
        this.appCtrl.getRootNav().push(GiftComponent);
        break;
      default:
        break;
    }
  }
}
