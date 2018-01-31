import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';

@Injectable()
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getProduct(guid: number) {
    return this.apiService.getProduct(guid);
  }
}
