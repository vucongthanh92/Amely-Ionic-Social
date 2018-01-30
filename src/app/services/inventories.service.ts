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
}
