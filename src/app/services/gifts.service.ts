import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GiftsService {

  constructor(
    public api: ApiService
  ) { }

  gift(obj) {
    let params = { 
      from_guid: obj.from_guid, 
      to_guid: obj.to_guid, 
      to_type: obj.to_type, 
      item_guid: obj.item_guid, 
      item_quantity: obj.item_quantity, 
      message: obj.message
    };
    return this.api.createGift(params);
  }

  accept(gift_guid) {
    return this.api.acceptGift({ gift_guid: gift_guid });
  }

  reject(gift_guid) {
    return this.api.rejectGift(gift_guid);
  }

}
