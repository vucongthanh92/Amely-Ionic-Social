import { ApiService } from './../api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class WalletsService {

  constructor(private api: ApiService) { }

  confirmWithdrawn() {
    return this.api.actionsWallet({
      action: 'withdrawal', amount: null, step: 'confirm', payment_method: null, paypal_email: null, note: null,
      bank_branch_name: null, bank_name: null, bank_account_name: null, bank_account_number: null
    })
  }

  confirmDeposit() {
    return this.api.actionsWallet({
      action: 'deposit', amount: null, step: 'confirm', payment_method: null, paypal_email: null, note: null,
      bank_branch_name: null, bank_name: null, bank_account_name: null, bank_account_number: null
    })
  }

  confirmOptionWithdrawn(amount, payment_method, paypal_email, note, bank_branch_name, bank_name, bank_account_name, bank_account_number) {
    return this.api.actionsWallet({
      action: 'withdrawal', amount: amount, step: 'payment_option', payment_method: payment_method, paypal_email: paypal_email, note: note,
      bank_branch_name: bank_branch_name, bank_name: bank_name, bank_account_name: bank_account_name, bank_account_number: bank_account_number
    })
  }

  confirmOptionDeposit(payment_method, amount) {
    return this.api.actionsWallet({
      action: 'deposit', step: 'payment', payment_method: payment_method, amount: amount
    })
  }

  deposit(payment_method, bankcode, amount) {
    return this.api.actionsWallet({
      action: 'deposit', step: 'payment_option', payment_method: payment_method, bankcode: bankcode, amount: amount
    })
  }

  getCartFromQR(code: string) {
    return this.api.getTempOrderFromQR(code);
  }
}
