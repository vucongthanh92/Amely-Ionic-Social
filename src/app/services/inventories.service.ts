import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';

@Injectable()
export class InventoriesService {

  constructor(private apiService: ApiService) { }

  getInventory(guid, type) {
    return this.apiService.getInventory({ ownerGuid: guid, inventoryType: type });
  }
  getInventoriesByType(offset, limit, ownerGuid, itemType, inventoryType) {
    return this.apiService.getInventoryByType({ offset: offset, limit: limit, owner_guid: ownerGuid, inventory_type: inventoryType, item_type: itemType });
  }
  getItemInventory(guid) {
    return this.apiService.getInventoryItem(guid);
  }

  createRedeem(item_guid, owner_guid, quantity_redeem) {
    return this.apiService.createRedeem({ item_guid: item_guid, owner_guid: owner_guid, quantity_redeem: quantity_redeem });
  }

  getWallet() {
    return this.apiService.getWallet();
  }

  createWallet() {
    return this.apiService.createWallet({ currency: 'VND' });
  }

  addWishList(guid: number) {
    return this.apiService.createWishList({ item_guid: guid });
  }

  deleteWishList(guid: number) {
    return this.apiService.deleteWishList(guid);
  }

  addGiveList(guid: number) {
    return this.apiService.createGiveList({ item_guid: guid });
  }

  deleteGiveList(guid: number) {
    return this.apiService.deleteGiveList(guid);
  }

  delevery(shipping_ward: string, step: string, shipping_phone: string, shipping_address: string, shipping_province: string, shipping_district: string, shipping_fullname: string, shipping_note: string, shipping_method: string, shipping_fee: string, item: string, quantity: number, shop_guid: number) {
    return this.apiService.createDO({
      shipping_ward: shipping_ward, step: step, shipping_phone: shipping_phone, shipping_address: shipping_address, shipping_province: shipping_province,
      shipping_district: shipping_district, shipping_fullname: shipping_fullname, shipping_note: shipping_note, shipping_method: shipping_method,
      shipping_fee: shipping_fee, item: item, quantity: quantity, shop_guid: shop_guid
    })
  }

  renewalItem(item_guid, duration) {
    return this.apiService.extendDays({ duration: duration, item_guid: item_guid })
  }

}
