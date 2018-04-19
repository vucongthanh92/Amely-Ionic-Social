import { DISTRICTS } from './../../../districts';
import { WARDS } from './../../../wards';
import { CustomService } from './../../../services/custom.service';
import { Shop } from './../../../api/models/shop';
import { Product } from './../../../api/models/product';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/models';
import { PROVINCES } from '../../../provinces';

@Component({
  selector: 'app-quick-pay-confirm',
  templateUrl: './quick-pay-confirm.component.html'
})
export class QuickPayConfirmComponent implements OnInit {

  public payment_method: any;
  public products: Product[];
  public shop: Shop
  public shipping: any;
  public userCurrent: User;
  public shipping_methods: any;
  private user_current: User;
  constructor(private paymentService: PaymentService, private customService: CustomService) { }

  ngOnInit() {
    this.payment_method = this.paymentService.quick_pay_send_data.paymentMethod;
    this.products = this.paymentService.quick_pay_send_data.products;
    this.shop = this.paymentService.quick_pay_send_data.shop;
    this.shipping = this.paymentService.quick_pay_send_data.shipping;
    this.userCurrent = this.customService.user_current;
    this.shipping_methods = this.paymentService.quick_pay_send_data.shipping_methods;
    this.user_current = this.customService.user_current;
  }

  getTotalPrice() {
    let total: number = 0;
    this.products.forEach(element => {
      if (!element.hasInventory || element.hasInventory != 2)
        total += this.customService.netPrice(element) * element.display_quantity;
    });
    return total;
  }

  formartTotalPrice() {
    return this.customService.formatCurrency(this.getTotalPrice() + "", this.userCurrent.usercurrency);
  }

  getAddress() {
    const province: string = PROVINCES.filter(e => e.provinceid == this.shipping.shipping_province)[0].name;
    const ward: string = WARDS.filter(e => e.wardid == this.shipping.shipping_ward)[0].name;
    const district: string = DISTRICTS.filter(e => e.districtid == this.shipping.shipping_district)[0].name;
    return this.shipping.shipping_address + ", " + ward + ", " + district + ", " + province;
  }

  submitPayment() {
    console.log(this.user_current);
    console.log(this.paymentService.quick_pay_send_data);
    console.log(this.paymentService.payment_qr_data);
    console.log(this.paymentService.quick_pay_send_data.paymentMethod.displayname);

    if (this.paymentService.quick_pay_send_data.paymentMethod.filename == 'WOD' || this.paymentService.quick_pay_send_data.paymentMethod.filename == 'COD'
      || this.paymentService.quick_pay_send_data.paymentMethod.filename == 'COS') {
      this.paymentService.quickPay(this.user_current.fullname, this.user_current.fullname, this.user_current.address, this.user_current.province,
        this.user_current.district, this.user_current.ward, "", this.paymentService.quick_pay_send_data.paymentMethod.filename, "", this.user_current.mobilelogin,
        this.user_current.mobilelogin, this.user_current.address, this.user_current.province, this.user_current.district, this.user_current.ward, "",
        this.paymentService.quick_pay_send_data.paymentMethod.filename, "0", this.paymentService.payment_qr_data.to_guid).subscribe(data => {
          console.log(data);
        });
    }

  }
}
