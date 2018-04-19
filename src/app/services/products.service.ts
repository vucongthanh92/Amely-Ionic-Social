import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getProduct(guid: number) {
    return this.apiService.getProduct(guid);
  }

  searchProduct(text_search, category, type) {
    return this.apiService.searchs({ mobile: null, text_search: text_search, category: category, type: type })
  }
}
