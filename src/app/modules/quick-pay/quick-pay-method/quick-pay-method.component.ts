import { QuickPayShippingMethodComponent } from './../quick-pay-shipping-method/quick-pay-shipping-method.component';
import { QuickPayConfirmComponent } from './../quick-pay-confirm/quick-pay-confirm.component';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-quick-pay-method',
  templateUrl: './quick-pay-method.component.html'
})
export class QuickPayMethodComponent implements OnInit {
  @Input() headerColor: string = '#F53D3D';
  @Input() textColor: string = '#FFF';
  @Input() contentColor: string = '#F9F9F9';
  @Input() title: string;
  @Input() hasMargin: boolean = true;
  @Input() expanded: boolean = true;
  @Input() expandedPayment: boolean = false;
  expand: boolean = false;
  @ViewChild('accordionContent') elementView: ElementRef;
  @ViewChild('accordionContentPayment') elementViewPayment: ElementRef;

  viewHeight: number;
  viewHeightPayment: number;
  payment_methods: Array<any>;
  // payment_methods
  constructor(private renderer: Renderer, private nav: NavController, private paymentService: PaymentService, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.viewHeight = this.elementView.nativeElement.offsetHeight;
    this.viewHeightPayment = this.elementViewPayment.nativeElement.offsetHeight;

    if (!this.expanded) {
      this.renderer.setElementStyle(this.elementView.nativeElement, 'height', 0 + 'px');
    }

    if (!this.expandedPayment) {
      this.renderer.setElementStyle(this.elementViewPayment.nativeElement, 'height', 0 + 'px');
    }

    this.payment_methods = (<any>Object).values(this.paymentService.payment_order_post.payment_methods);
    this.payment_methods = this.payment_methods.filter(e => e.filename != 'ngl/atm' && e.filename != 'ngl/creditcard')

  }

  toggleAccordion() {
    if (this.expandedPayment && !this.expanded) {
      this.toggleAccordionPayment();
    }
    this.expanded = !this.expanded;
    const newHeight = this.expanded ? '100%' : '0px';
    this.renderer.setElementStyle(this.elementView.nativeElement, 'height', newHeight);
  }

  toggleAccordionPayment() {
    if (!this.expandedPayment && this.expanded) {
      this.toggleAccordion();
    }

    this.expandedPayment = !this.expandedPayment;
    const newHeight = this.expandedPayment ? '100%' : '0px';
    this.renderer.setElementStyle(this.elementViewPayment.nativeElement, 'height', newHeight);
  }
  confirmBill(quickpay) {
    let payment: any = {};

    switch (quickpay) {
      case 'COD':
        payment.filename = quickpay;
        payment.displayname = 'COD, tiền mặt nhận hàng';
        this.nav.push(QuickPayConfirmComponent);
        this.paymentService.quick_pay_send_data.paymentMethod = payment;
        break;
      case 'COS':
        payment.filename = quickpay;
        payment.displayname = 'COS, tiền mặt nhập kho';
        this.showAlertCOS(payment);
        break;
      case 'WOD':
        payment.filename = quickpay;
        payment.displayname = 'Ví của tôi, nhận hàng';
        this.nav.push(QuickPayConfirmComponent);
        this.paymentService.quick_pay_send_data.paymentMethod = payment;
        break;
    }
  }
  onPayment(payment) {
    this.nav.push(QuickPayShippingMethodComponent);
    this.paymentService.quick_pay_send_data.paymentMethod = payment;
  }
  showAlertCOS(payment) {
    if (this.checkItemRedeem()) {
      let alert = this.alertCtrl.create({
        title: 'Cảnh báo',
        subTitle: 'Vui lòng không sử dụng sản phẩm với phương thức tiền mặt vào kho',
        buttons: [
          {
            text: 'Quay về chọn sản phẩm',
            handler: () => {
              this.nav.pop();
            }
          }]
      });
      alert.present();
    } else {
      this.nav.push(QuickPayConfirmComponent);
      this.paymentService.quick_pay_send_data.paymentMethod = payment;
    }
  }
  checkItemRedeem() {
    (<any>Object).values(this.paymentService.payment_qr_data.products).forEach(e => {
      if (e.hasInventory == 2) {
        return true;
      }
    });
    return false;
  }
}
