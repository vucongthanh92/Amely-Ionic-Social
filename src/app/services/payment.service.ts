import { Param_create_order } from './../api/models/param-_create-_order';
import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService {
  
  payment_methods: any;
  param_create_order: Param_create_order;

  constructor(
    private api: ApiService
  ) { }

  getPaymentMethods() {
    return this.api.getOrders();
  }



}
