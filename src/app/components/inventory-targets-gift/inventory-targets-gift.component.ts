import { CustomService } from './../../services/custom.service';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { InventoryTargetGiftComponent } from '../inventory-target-gift/inventory-target-gift.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { EventsService } from '../../services/events.service';
import { InventoryConfirmGiftComponent } from '../inventory-confirm-gift/inventory-confirm-gift.component';

@Component({
  selector: 'app-inventory-targets-gift',
  templateUrl: './inventory-targets-gift.component.html'
})
export class InventoryTargetsGiftComponent implements OnInit {

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private groupService: GroupService,
    private userService: UserService,
    private eventService: EventsService,
    private loadingCtrl: LoadingController,
    private customService: CustomService
  ) {
    console.log('targets');
    console.log(this.navParams.get('item'));
  }

  ngOnInit() {
  }

  changePageTarget(type) {
    this.nav.push(InventoryTargetGiftComponent, { param: type, item: this.navParams.get('item') });
  }

  // changePageConfirm(group, 'group')
  // changePageConfirm(obj, type) {
  //   this.nav.push(InventoryConfirmGiftComponent, { param: obj, type: type, item: this.navParams.get('item') });
  // }
  scanQR() {

    this.barcodeScanner.scan().then(barcodeData => {
      const data = barcodeData.text;
      const stringObj = data.substring(data.indexOf("com/") + 4, data.length);
      const type = stringObj.substring(0, stringObj.indexOf('/'));
      const id = +stringObj.substring(stringObj.indexOf('/') + 1);

      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000
      });
      loader.present();
      console.log(type);
      console.log(id);

      switch (type) {
        case 'user':
          if (id == this.customService.user_current.guid) {
            this.customService.toastMessage('Bạn không thể tặng quà cho chính mình được', 'bottom', 3000);
            break;
          }
          this.userService.getUser(null, id).subscribe(data => {
            loader.dismiss();
            if (data.guid != null) {
              this.nav.push(InventoryConfirmGiftComponent, { param: data, type: type, item: this.navParams.get('item') });
            } else this.customService.toastMessage('Dữ liệu không tồn tại', 'bottom', 3000)
          })
          break;
        case 'group':
          this.groupService.getGroup(id).subscribe(data => {
            if (data.guid != null) {
              this.nav.push(InventoryConfirmGiftComponent, { param: data, type: type, item: this.navParams.get('item') });
            } else this.customService.toastMessage('Dữ liệu không tồn tại', 'bottom', 3000)
            loader.dismiss();
          })
          break;
        case 'event':
          this.eventService.getEvent(id).subscribe(data => {
            if (data.events.guid != null) {
              this.nav.push(InventoryConfirmGiftComponent, { param: data.events, type: type, item: this.navParams.get('item') });
            } else this.customService.toastMessage('Dữ liệu không tồn tại', 'bottom', 3000)
          })
          break;
        default:
          this.customService.toastMessage('Mã QR không hợp lệ', 'bottom', 3000)
          break

      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
