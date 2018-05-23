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

  quickPay(shipping_fullname: string, fullname: string, address: string, province: string, district: string,
    ward: string, note: string, payment: string, bankcode: string, phone: string, shipping_phone: string,
    shipping_address: string, shipping_province: string, shipping_district: string, shipping_ward: string,
    shipping_note: string, shipping_method: string, shipping_fee: string, to_guid: number) {
    return this.api.quickPayCreate({
      shipping_fullname: shipping_fullname, fullname: fullname, address: address, province: province, district: district,
      ward: ward, note: note, payment: payment, bankcode: bankcode, phone: phone, shipping_phone: shipping_phone,
      shipping_address: shipping_address, shipping_province: shipping_province, shipping_district: shipping_district, shipping_ward: shipping_ward,
      shipping_note: shipping_note, shipping_method: shipping_method, shipping_fee: shipping_fee, to_guid: to_guid
    })
  }
  getShippingFee(shipping_method: string, shipping_name: string, shipping_phone: string, shipping_address: string, shipping_province: string, shipping_district: string, shipping_ward: string, shipping_note: string, to_guid: string) {
    return this.api.getShippingFee({
      shipping_method: shipping_method, shipping_name: shipping_name, shipping_phone: shipping_phone, shipping_address: shipping_address,
      shipping_province: shipping_province, shipping_district: shipping_district, shipping_ward: shipping_ward, shipping_note: shipping_note, to_guid: to_guid
    })
  }

  deleteQuickPay(toGuid: number) {
    return this.api.quickpayDelete({ toGuid: toGuid, isShop: "false" });
  }
}
