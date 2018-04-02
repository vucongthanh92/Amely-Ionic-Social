import { NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-payment-webview',
  templateUrl: './payment-webview.component.html'
})
export class PaymentWebviewComponent implements OnInit {
  url: string
  constructor(private navParams: NavParams, private sanitizer: DomSanitizer) {
    this.url = this.navParams.get('url');
  }

  ngOnInit() {
  }

  byPassUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.url);
  }
}
