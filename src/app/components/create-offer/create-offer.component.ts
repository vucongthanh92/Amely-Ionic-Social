import { Offer } from './../../api/models/offer';
import { FirebaseService } from './../../services/firebase.service';
import { CustomService } from './../../services/custom.service';
import { OfferService } from './../../services/offer.service';
import { ChosenItemComponent } from './../chosen-item/chosen-item.component';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, App, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Item } from '../../api/models/item';
import { Param_create_offer } from '../../api/models/param-_create-_offer';
import { GeolocationService } from '../../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation';
import { MapComponent } from '../map/map.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html'
})
export class CreateOfferComponent implements OnInit {

  @Input('description') description: string;
  public is_used: boolean = false;
  offer_target: Offer;
  counter = false;
  item: Item;
  avatar: any;
  offer_type: string;
  target: string;
  duration: number;
  limit_counter: number;
  giveaway_approval: boolean = false;

  limit_counter_select: any;
  offer_type_select: any;
  target_select: any;
  duration_select: any;

  lng_custom;
  lat_custom;

  constructor(
    private geolocationService: GeolocationService,
    private geolocation: Geolocation,
    private fbService: FirebaseService,
    private customService: CustomService,
    private offerService: OfferService,
    private appCtrl: App,
    private nav: NavController,
    private params: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private userService: UserService
  ) {
    this.counter = this.params.get('counter');
    this.offer_target = this.params.get('param');

    this.offer_type_select = {
      title: "Hình thức trao đổi"
    }
    this.target_select = {
      title: "Đối tượng trao đổi"
    }
    this.duration_select = {
      title: "Thời gian hiệu lực"
    }
    this.limit_counter_select = {
      title: "Số người tham gia"
    }
  }

  ngOnInit() {
  }


  offer() {
    this.customService.confirmPassword(this.alertCtrl, this.userService)
      .then(() => {
        this.is_used = true;
        let loading = this.loadingCtrl.create({
          content: 'Please wait...',
          enableBackdropDismiss: true
        });
        loading.present();
        if (this.counter) {
          if (this.item) {
            let obj = { item_guid: this.item.guid, note: this.description, offer_guid: this.offer_target.guid, quantity: this.item.quantity };
            this.retryCreateCounterOffer(5,obj,loading)
          } else {
            loading.dismiss();
            this.customService.toastMessage('Chưa chọn quà', 'bottom', 3000);
          }
        } else {
          if (!this.offer_type) {
            loading.dismiss();
            this.customService.toastMessage('Chưa chọn hình thức trao đổi', 'bottom', 3000);
          } else if (!this.target) {
            loading.dismiss();
            this.customService.toastMessage('Chưa chọn đối tượng trao đổi', 'bottom', 3000);
          } else if (!this.duration) {
            loading.dismiss();
            this.customService.toastMessage('Chưa chọn thời gian trao đổi', 'bottom', 3000);
          } else if (this.offer_type == 'random' && !this.limit_counter) {
            loading.dismiss();
            this.customService.toastMessage('Chưa chọn giới hạn thành viên tham gia', 'bottom', 3000);
          } else if (!this.item) {
            loading.dismiss();
            this.customService.toastMessage('Chưa chọn quà', 'bottom', 3000);
          } else {

            let obj: Param_create_offer = {};
            obj.offer_type = this.offer_type;
            obj.duration = this.duration;
            obj.target = this.target;
            obj.limit_counter = (+this.limit_counter)+1;
            obj.giveaway_approval = this.giveaway_approval;
            obj.random_expiration = false;
            obj.item_guid = this.item.guid;
            obj.quantity = this.item.quantity;
            obj.note = this.description;
            obj.location_lat = "100";
            obj.location_lng = "100";

            this.retryCreateOffer(5, obj, loading);
          }
        }
      })
  }

  onChangeTarget() {
    console.log(this.target);
    if (this.target == 'location') {
      this.appCtrl.getRootNav().push(MapComponent, { callback: this.callbackLocation })
    }
  }

  callbackLocation = (_params) => {
    return new Promise((resolve, reject) => {
      console.log('add-feed');
      console.log(_params);

      let alert = this.alertCtrl.create({
        title: 'Xác nhận vị trí',
        message: _params.title,
        buttons: [
          {
            text: 'Từ chối',
            role: 'cancel'
          },
          {
            text: 'Chấp nhận',
            handler: () => {
              this.lng_custom = _params.lng;
              this.lat_custom = _params.lat;
            }
          }
        ]
      });
      alert.present();
      resolve();
    });
  }

  chosenItem() {
    this.appCtrl.getRootNav().push(ChosenItemComponent, {
      callback: this.myCallbackFunction
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.item = _params;
      this.avatar = this.item.product_snapshot.images[0];
      resolve();
    });
  }

  dismiss() {
    this.nav.pop();
  }

  retryCreateOffer(retry, obj, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.offerService.createOffer(obj).subscribe(data => {
      console.log(data);
      
      if (data.offer_guid) {
        loading.dismiss();
        let owner_from = data.offer_guid;
        if (this.target != 'friends') {
          this.geolocation.getCurrentPosition().then((resp) => {
            let lat = resp.coords.latitude;
            let lng = resp.coords.longitude;
            if (this.target == 'location') {
              if (this.lat_custom && this.lng_custom) {
                lat = this.lat_custom;
                lng = this.lng_custom;
                console.log('lat_custom && lng_custom != null , not empty');
              } else {
                this.target = 'public';
              }
            }
            let geoHash = this.geolocationService.encodeGeohash([lat, lng], 10);
            this.fbService.createLocation(owner_from, "offers", geoHash, lat, lng);
          });
        }
        let callback = this.params.get("callback");
        callback("test").then(() => {
          this.customService.toastMessage("Tạo đề xuất trao đổi thành công !!!", "bottom", 3000);
          this.nav.pop();
        });
      } else {
        this.customService.toastMessage("Bạn đã hết lượt trao đổi !!!", "bottom", 3000);
      }
    }, err => this.retryCreateOffer(--retry, obj, loading))
  }

  retryCreateCounterOffer(retry, obj, loading) {
    if (retry == 0) {
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      loading.dismiss();
      return;
    }
    this.offerService.createCounterOffer(obj).subscribe(data => {
      loading.dismiss();
      if (data.status) {
        let callback = this.params.get("callback");
        callback("back").then(() => {
          this.nav.pop();
        });
      } else {
        this.customService.toastMessage("Trao đổi thất bại !!!", "bottom", 3000);
      }
    }, err => { this.retryCreateCounterOffer(--retry, obj, loading) });
  }
}
