import { InventoryComponent } from './../inventory/inventory.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { App, NavParams, NavController, PopoverController, LoadingController } from 'ionic-angular';
import { GiftComponent } from '../gift/gift.component';
import { BusinessService } from '../../services/business.service';
import { Business } from '../../api/models/business';
import { CustomService } from '../../services/custom.service';
import { BusinessMenuComponent } from './business-menu/business-menu.component';
import { FeedsComponent } from '../feeds/feeds.component';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html'
})
export class BusinessComponent implements OnInit {
  private business_guid: number;
  public page: Business;
  public is_owner: boolean = false;
  public is_show_fab: boolean = false;
  @ViewChild('feeds') feeds: FeedsComponent;
  constructor(public nav: NavController, public appCtrl: App, private nav_param: NavParams, private service: BusinessService
    , private customService: CustomService, public popoverCtrl: PopoverController, private loadingCtrl: LoadingController) {
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
        data.avatar = this.customService.replaceImageToLarger(data.avatar);
        this.page = data;
        this.is_owner = this.customService.user_current.guid == data.owner.guid;
        this.is_show_fab = data.owner.guid == this.customService.user_current.guid;
      },
      err => {
        this.loadData(--retry)
      })
  }

  likePage(isLike: boolean) {
    if (isLike) {
      this.retryLike(5);
    } else {
      this.retryUnlike(5);
    }
  }
  newfeedsPage = true;

  retryLike(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.like('business', this.business_guid).subscribe(data => {
      if (data.status) {
        this.page.followed = true;
      }
    }, err => this.retryLike(--retry));
  }

  retryUnlike(retry) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.unlike('business', this.business_guid).subscribe(data => {
      if (data.status) {
        this.page.followed = false;
      }
    }, err => this.retryUnlike(--retry));
  }

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
    let popover = this.popoverCtrl.create(BusinessMenuComponent, { page: this.page, callback: this.callbackAvatarCover });
    popover.present({
      ev: myEvent
    });
  }

  callbackAvatarCover = (_params) => {
    return new Promise((resolve, reject) => {
      // const url: string = _params.url;
      // const isAvatar: boolean = _params.isAvatar;
      // isAvatar ? this.page.avatar = url : this.page.cover = url;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: true
      });

      loading.present();
      setTimeout(() => {
        loading.dismiss();
        this.loadData(5)
      }, 4000);
      resolve();
    });
  }

  dismiss() {
    this.nav.pop();
  }


  addFeed() {
    this.feeds.addNewFeed()
  }
}


