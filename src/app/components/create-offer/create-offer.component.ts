import { CustomService } from './../../services/custom.service';
import { OfferService } from './../../services/offer.service';
import { ChosenItemComponent } from './../chosen-item/chosen-item.component';
import { Component, OnInit, Input } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Item } from '../../api/models/item';
import { Param_create_offer } from '../../api/models/param-_create-_offer';


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html'
})
export class CreateOfferComponent implements OnInit {

  @Input('description') description: string;


  item: Item;
  avatar: any;
  offer_type: string;
  target: string;
  duration: number;
  limit_counter: number;
  giveaway_approval: any;

  limit_counter_select: any;
  offer_type_select: any;
  target_select: any;
  duration_select: any;

  constructor(
    private customService: CustomService,
    private offerService: OfferService,
    private appCtrl: App,
    private nav: NavController
  ) {
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
    let obj: Param_create_offer = {};
    obj.offer_type = this.offer_type;
    obj.duration = this.duration;
    obj.target = this.target;
    obj.limit_counter = this.limit_counter;
    obj.giveaway_approval = this.giveaway_approval;
    obj.random_expiration = false;
    obj.item_guid = this.item.guid;
    obj.quantity = this.item.quantity;
    obj.note = this.description;
    obj.location_lat = "100";
    obj.location_lng = "100";

    this.offerService.createOffer(obj).subscribe(data => {
      if (data.offer_guid) {
        this.nav.pop();
      } else {
        this.customService.toastMessage("Bạn đã hết lượt trao đổi !!!", "bottom", 5000);
      }
    })
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
}
