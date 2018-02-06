import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class ShopsService {

  constructor(private api: ApiService) { }

  getShop(shopGuid, storeGuid) {
    return this.api.getShop({ storeGuid: storeGuid, shopGuid: shopGuid });
  }
}
