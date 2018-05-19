import { FirebaseService } from './../../../services/firebase.service';
import { CustomService } from './../../../services/custom.service';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core'; ``
import { NavParams, App, LoadingController, NavController, ActionSheetController, AlertController } from 'ionic-angular';
import { Event } from '../../../api/models';
import { QrComponent } from '../../qr/qr.component';
import { Camera } from '@ionic-native/camera';
import { InventoryComponent } from '../../inventory/inventory.component';

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html'
})
export class EventMenuComponent implements OnInit {
  private event: Event;
  private callback: any;
  has_inventory: boolean;
  callbackReload: any;
  //"history"  "guest" "member" "visitor"
  public type: string;
  public is_user_current: boolean = false;
  constructor(private navParams: NavParams, public eventSerive: EventsService, private customService: CustomService, private appCtrl: App,
    public loadingCtrl: LoadingController, private nav: NavController, private actionSheetCtrl: ActionSheetController, private camera: Camera,
    private fbService: FirebaseService, private alertCtrl: AlertController) {
    this.event = this.navParams.get('event');
    this.has_inventory = this.event.has_inventory == '1';
    this.type = this.navParams.get('type');
    this.callback = this.navParams.get("callback");
    this.callbackReload = this.navParams.get("callbackreload");

    this.is_user_current = this.customService.user_current.guid == this.event.creator.guid;



  }

  ngOnInit() {
  }

  /**
      * 0: close 
      * 1: open 
      * 2: open and publish
      * 3: close and publish
    **/
  publicEvent() {
    this.nav.pop();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    this.retryPublicEvent(5, loading);
  }

  retryPublicEvent(retry, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.eventSerive.publicEvent(this.event.guid).subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.eventSerive.publish = 2;
      } else {
        loading.dismiss();
        this.customService.toastMessage('Công bố thất bại , vui lòng thử lại .', 'bottom', 3000)
      }
    },
      err => {
        this.retryPublicEvent(--retry, loading);
      })
  }

  closeOpenEvent() {
    this.nav.pop();
    // if (this.event) {
    //   console.log(this.event);

    // }
    if (this.eventSerive.publish == 1 || this.eventSerive.publish == 2) {
      // close
      this.eventSerive.openCloseEvent(this.event.location, this.event.guid, this.event.description, this.event.start_date + '', this.event.end_date + '', this.event.country,
        this.event.title, this.event.template, this.event.has_inventory, "1", 'user', this.event.owner_user, this.event.invites).subscribe(data => {
          if (data.status) {
            if (this.eventSerive.publish == 1) {
              this.eventSerive.publish = 0;
            } else {
              this.eventSerive.publish = 3;
            }
          }
        })
    } else {
      // open
      this.eventSerive.openCloseEvent(this.event.location, this.event.guid, this.event.description, this.event.start_date + '', this.event.end_date + '', this.event.country,
        this.event.title, this.event.template, this.event.has_inventory, "2", 'user', this.event.owner_user, this.event.invites).subscribe(data => {
          if (data.status) {
            if (this.eventSerive.publish == 0) {
              this.eventSerive.publish = 1;
            } else if (this.eventSerive.publish == 3) {
              this.eventSerive.publish = 2;
            }
          }
        })
    }
  }

  openQR() {
    this.appCtrl.getRootNav().push(QrComponent, { code: this.customService.url_qr + "event/" + this.event.guid })
    this.nav.pop();
  }

  changeCover() {
    this.nav.pop();
    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService).then(url => {
      let images = [url + ''];
      this.retryUpdateCover(5, images);
    })
  }
  changeAvatar() {
    this.nav.pop();
    this.customService.imageAction(this.actionSheetCtrl, this.camera, this.fbService).then(url => {
      let images = [url + ''];
      this.retryChangeAvatar(5, images)

    })
  }

  deleteEvent() {
    let alert = this.alertCtrl.create({
      title: 'Xác nhận',
      message: 'Bạn có muốn xóa sự kiện?',
      buttons: [
        {
          text: 'Từ chối',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Chấp nhận',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...',
              enableBackdropDismiss: true
            });
            loading.present();
            this.retryDeleteEvent(5, loading)
          }
        }
      ]
    });
    alert.present();
  }

  retryDeleteEvent(retry, loading) {
    if (retry == 0) {
      loading.dismiss();      
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.eventSerive.deleteEvent(this.event.guid).subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.nav.pop();
        this.customService.toastMessage('Xóa sự kiện thành công!', 'bottom', 3000)
        this.callbackReload().then(() => {
        });
      } else {
        loading.dismiss();
        this.customService.toastMessage('Xóa sự kiện thất bại , vui lòng thử lại .', 'bottom', 3000)
      }
    }, err => this.retryDeleteEvent(--retry, loading));
  }

  retryUpdateCover(retry, images) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    console.log(this.event.guid);
    console.log(images);

    this.customService.updateCover(+this.event.guid, "event", images).subscribe(data => {
      if (data.status) {
        this.callback({ url: data + "", isAvatar: false }).then(() => {
        });
      } else {
        this.customService.toastMessage("Đã có lỗi vui lòng thử lại.", "bottom", 3000);
      }
    }, err => this.retryUpdateCover(--retry, images))
  }

  retryChangeAvatar(retry, images) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.customService.updateAvatar(+this.event.guid, "event", images).subscribe(data => {
      console.log(data);

      if (data.status) {
        this.callback({ url: data + "", isAvatar: true }).then(() => {
        });
      } else {
        this.customService.toastMessage("Đã có lỗi vui lòng thử lại.", "bottom", 3000);
      }
    }, err => this.retryChangeAvatar(--retry, images))
  }

  openInventory() {
    this.nav.pop();
    this.appCtrl.getRootNav().push(InventoryComponent, { type: 'event', ownerGuid: this.event.guid, obj: this.event });
  }


}
