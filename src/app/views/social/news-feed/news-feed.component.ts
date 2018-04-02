import { CustomService } from './../../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
})

export class NewsFeedComponent implements OnInit {
  url: string = "https://mtf.onepay.vn/onecomm-pay/vpc.op?Title=Payment+Online&vpc_AccessCode=D67342C2&vpc_Amount=0&vpc_Command=pay&vpc_Currency=VND&vpc_Customer_Email=Amely123%40gmail.com&vpc_Customer_Id=quannm&vpc_Customer_Phone=0976562851&vpc_Locale=vn&vpc_MerchTxnRef=1821&vpc_Merchant=ONEPAY&vpc_OrderInfo=1821&vpc_ReturnURL=https%3A%2F%2Famely.com%2Fm%2Ftemp_order%2F1821%2Fcomplete&vpc_SHIP_City=Ba+Ae+A+Nh&vpc_SHIP_Country=Viet+Nam&vpc_SHIP_Provice=Ha+Na+I&vpc_SHIP_Street01=102894&vpc_TicketNo=14.161.22.78&vpc_Version=2&vpc_SecureHash=C239F7A83D1C801CD5FD90AABCD552DA3705781ECC8C062D04486F4B89617AA8";
  feed_type = "home";
  url1;
  constructor(
    public nav: NavController,
    public appCtrl: App,
    public customService: CustomService,
    private sanitizer: DomSanitizer
  ) {
    // this.url ='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    this.url1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      // document.getElementById('innerframetmp');
   
   }

  ngOnInit() { }
  byPassUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);	
  }


}
