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

  
}
