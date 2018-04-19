import { Param_create_order } from './../api/models/param-_create-_order';
import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService {

  payment_methods: any;
  param_create_order: Param_create_order = {};
  items: any = {};
  payment_order_post: any;
  payment_qr_data: any;
  quick_pay_send_data: any = {};

  constructor(
    private api: ApiService
  ) { }

  getPaymentMethods() {
    return this.api.getOrders();
  }

  createOrder() {
    return this.api.createOrder(this.param_create_order);
  }

  getTempOrder(qr: string) {
    return this.api.getTempOrderFromQR(qr);
  }

  getPaymentMethod() {
    return this.api.getOrders();
  }

  orderRedeem(to_guid: string, product_guid: string, redeem_quantity: string) {
    return this.api.orderRedeem({ to_guid: to_guid, product_guid: product_guid, redeem_quantity: redeem_quantity });
  }
}
