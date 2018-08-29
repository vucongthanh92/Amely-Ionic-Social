import { CustomService } from './../../services/custom.service';
import { Item } from './../../api/models/item';
import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemComponent } from '../item/item.component';
import { InventoriesService } from '../../services/inventories.service';

@Component({
  selector: 'app-invenroy-items',
  templateUrl: './invenroy-items.component.html'
})
export class InvenroyItemsComponent implements OnInit {
  fakeUsers: Array<any> = new Array(30);
  private ownerGuid: number;
  private itemType: string;
  private inventoryType: string;
  public inventoriesItem: Array<Item> = [];
  public title: string;
  public is_remove_item = false;
  private is_reload_before_page = false;
  private callback: any;
  private isAdminGroup: any;
  private isAdminEvent: any;
  private offset: number = 0;
  private limit: number = 20;
  private isLoadmoreFinish: boolean = false;

  constructor(public nav: NavController, public appCtrl: App, private navParams: NavParams, private inventoryService: InventoriesService,
    private customService: CustomService, public loadingCtrl: LoadingController) {
    this.ownerGuid = this.navParams.get('ownerGuid');
    this.itemType = this.navParams.get('itemType');
    this.inventoryType = this.navParams.get('inventoryType');
    this.title = this.navParams.get('title');
    this.callback = this.navParams.get('callback');
    this.isAdminGroup = this.navParams.get("isAdminGroup");
    this.isAdminEvent = this.navParams.get("isAdminEvent");
  }

  ngOnInit() {
    // this.loadData();
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.loadData(5, loading);

  }

  loadData(retry, loading) {



    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    // if (this.itemType === 'all') {
    //   this.inventoryService.getInventory(this.ownerGuid, this.inventoryType).subscribe(
    //     data => {
    //       if (data instanceof Array) {
    //         this.inventoriesItem = data;
    //         console.log(this.inventoriesItem);

    //       } else {
    //         this.inventoriesItem = [];
    //       }
    //       // loading.dismiss();
    //     },
    //     err => {
    //       this.loadData(--retry)
    //     })
    // } else {
    this.inventoryService.getInventoriesByType(this.offset, this.limit, this.ownerGuid, this.itemType, this.inventoryType).subscribe(
      data => {
        loading.dismiss();
        if (data instanceof Array) {
          this.inventoriesItem = data;
        } else {
          this.inventoriesItem = [];
        }
      },
      err => {
        this.loadData(--retry, loading)
      })
    // }
  }

  goToPage(value, item) {
    console.log(JSON.stringify(item));

    switch (value) {
      case 'item':
        this.appCtrl.getRootNav().push(ItemComponent, {
          isAdminGroup: this.isAdminGroup, itemGuid: item.guid, callback: this.myCallbackFunction,
          inventoryType: this.inventoryType, isAdminEvent: this.isAdminEvent
        });
        break;
      case 'default':
        break;
    }
  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page

  }
  myCallbackFunction = (values) => {
    return new Promise((resolve, reject) => {
      if (values) {
        this.nav.getActive().component;
        this.is_reload_before_page = true;
        this.callback(values).then((values1) => {
        });
      }
      resolve();
    });
  }

  dismiss() {
    this.nav.pop();
  }

  doInfinite(infiniteScroll) {
    if (!this.isLoadmoreFinish) {
      this.offset += this.limit;
      // console.log("offset             :" + this.offset);
      // console.log("limit              :" + this.limit);
      // console.log("ownerGuid          :" + this.ownerGuid);
      // console.log("itemType           :" + this.itemType);
      // console.log("inventoryType      :" + this.inventoryType);
      // console.log("________________________________");

      this.inventoryService.getInventoriesByType(this.offset, this.limit, this.ownerGuid, this.itemType, this.inventoryType).subscribe(
        data => {
          infiniteScroll.complete();
          console.log(data.length);

          if (data.length == 0 || data.length == undefined) this.isLoadmoreFinish = true;
          this.inventoriesItem = this.inventoriesItem.concat(data);
        },
        err => {
          infiniteScroll.complete();
          this.offset -= this.limit;
        }
      )
    } else {
      infiniteScroll.complete();
    }
  }
}
