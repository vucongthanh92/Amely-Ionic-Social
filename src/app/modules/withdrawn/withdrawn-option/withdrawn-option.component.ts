import { WalletsService } from './../../../services/wallets.service';
import { CustomService } from './../../../services/custom.service';
import { NavParams, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdrawn-option',
  templateUrl: './withdrawn-option.component.html'
})
export class WithdrawnOptionComponent implements OnInit {
  paymentMethod: string;
  amount: number;

  email: string;
  note: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  bank_branch_name: string;
  constructor(private navParams: NavParams, private customService: CustomService, private nav: NavController, private walletService: WalletsService) {
    this.paymentMethod = this.navParams.get('paymentMethod');
    this.amount = this.navParams.get('amount');
    console.log(this.paymentMethod);
    console.log(this.amount);

  }

  ngOnInit() {

  }
  convertAmount() {
    return this.customService.formatCurrency(this.amount + "", this.customService.user_current.usercurrency);
  }

  changePage() {
    switch (this.paymentMethod) {
      case 'paypal/standard':
        if (!this.email) {
          this.customService.toastMessage('Email không được để trống', 'bottom', 2000);
        } else {
          this.walletService.confirmOptionWithdrawn(this.amount+"", this.paymentMethod, this.email, this.note, null, null, null, null).subscribe(data => {
            if (!data.status) {
              this.customService.toastMessage("Thực hiện rút tiền thất bại", 'bottom', 2000)
            } else {
              this.customService.toastMessage("Thực hiện rút tiền thành công", 'bottom', 2000);
              this.nav.popToRoot();
            }
          })
        }
        break;

      case 'sq/bankaccount':
        if (!this.account_number) {
          this.customService.toastMessage("Số tài khoản không được để trống", 'bottom', 2000)
        } else if (!this.account_name) {
          this.customService.toastMessage("Tên tài khoản không được để trống", 'bottom', 2000)
        } else if (!this.bank_name) {
          this.customService.toastMessage("Tên ngân hàng không được để trống", 'bottom', 2000)
        } else if (!this.bank_branch_name) {
          this.customService.toastMessage("Tên chi nhánh không được để trống", 'bottom', 2000)
        } else  {
          this.walletService.confirmOptionWithdrawn(this.amount+"",this.paymentMethod,null,this.note,this.bank_branch_name,
          this.bank_name,this.account_name,this.account_number).subscribe(data=>{
            if (!data.status) {
              this.customService.toastMessage("Thực hiện rút tiền thất bại", 'bottom', 2000)
             
            } else {
              this.customService.toastMessage("Thực hiện rút tiền thành công", 'bottom', 2000);
              this.nav.popToRoot();
            }
          })
        }
          
        break;
    }
  }

}
