import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';
@Injectable()
export class ShoppingsService {

  constructor(private apiService: ApiService) { }

  getCategories(offset, limit, shop_guid, type, get_all) {
    return this.apiService.getCategories({ offset: offset, limit: limit, shop_guid: shop_guid, type: type, get_all: get_all })
  }

  getMostSoldProducts(){
    return this.apiService.getProductsMostSold();
  }
}
