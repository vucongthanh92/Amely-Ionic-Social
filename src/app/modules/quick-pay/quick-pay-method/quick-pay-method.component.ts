import { QuickPayShippingMethodComponent } from './../quick-pay-shipping-method/quick-pay-shipping-method.component';
import { QuickPayConfirmComponent } from './../quick-pay-confirm/quick-pay-confirm.component';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(private renderer: Renderer, private nav: NavController) { }

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
  }

  toggleAccordion() {
    this.expanded = !this.expanded;
    const newHeight = this.expanded ? '100%' : '0px';
    this.renderer.setElementStyle(this.elementView.nativeElement, 'height', newHeight);
  }

  toggleAccordionPayment() {
    this.expandedPayment = !this.expandedPayment;
    const newHeight = this.expandedPayment ? '100%' : '0px';
    this.renderer.setElementStyle(this.elementViewPayment.nativeElement, 'height', newHeight);
  }
  confirmBill() {
    this.nav.push(QuickPayConfirmComponent);
  }
  onPayment(){
    this.nav.push(QuickPayShippingMethodComponent);
  }
}
