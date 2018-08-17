import { Injectable } from '@angular/core';
import { ApiService } from './../api/services/api.service';
@Injectable()
export class ShoppingsService {

  constructor(private apiService: ApiService) { }

  getCategories(offset, limit, shop_guid, type, get_all) {
    return this.apiService.getCategories({ offset: offset, limit: limit, shop_guid: shop_guid, type: type, get_all: get_all })
  }

  getMostSoldProducts() {
    return this.apiService.getProductsMostSold();
  }

  getVouchers(offset: number, limit: number) {
    return this.apiService.getVouchers({ offset: offset, limit: limit })
  }

  getFriendlyShop() {
    return this.apiService.getFriendlyShop();
  }

  getProducts(category_guid, shop_guid, type_product, product_filter, get_all, offset, limit) {
    return this.apiService.getProducts({
      category_guid: category_guid, shop_guid: shop_guid, type_product: type_product, product_filter: product_filter,
      get_all: get_all, offset: offset, limit: limit
    });
  }

  putCart(product_list) {
    return this.apiService.getCarts(product_list);
  }

  getProductsFeature() {
    return this.apiService.getFeaturedProducts();
  }

  getShopFeature() {
    return this.apiService.getFeaturedShops();
  }

  getShopFeatureProducts(shopGuid) {
    return this.apiService.getShopFeatureProducts({ shop_guid: shopGuid });
  }

  getShopMostSoldProducts(shopGuid) {
    return this.apiService.getShopMostSoldProducts({ shop_guid: shopGuid });
  }
}
