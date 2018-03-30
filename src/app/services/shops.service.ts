import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class ShopsService {

  constructor(private api: ApiService) { }

  getShop(shopGuid, storeGuid) {
    return this.api.getShop({ storeGuid: storeGuid, shopGuid: shopGuid });
  }

  getRequestShop() {
    return this.api.getRequestShop();
  }

  createShop(shipping_method: string, shop_name: string, shop_address: string, shop_bidn: string, adjourn_price: string, friendly_url: string, shop_phone: string, owner_name: string, owner_phone: string, owner_address: string, owner_ssn: string, ossn_photo: string) {
    return this.api.createRequestShop({
      shipping_method: shipping_method, shop_name: shop_name, shop_address: shop_address, shop_bidn: shop_bidn, adjourn_price: adjourn_price,
      friendly_url: friendly_url, shop_phone: shop_phone, owner_name: owner_name, owner_phone: owner_phone, owner_address: owner_address,
      owner_ssn: owner_ssn, ossn_photo: ossn_photo, approve: '2'
    });
  }
  getBanners(){
    return  this.api.getBanners();
  }

  clickAdv(guid:number){
    return this.api.clickAds(guid);
  } 
}