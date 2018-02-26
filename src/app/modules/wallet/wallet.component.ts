import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WalletDepositComponent } from './wallet-deposit/wallet-deposit.component';
import { WalletWithdrawnComponent } from './wallet-withdrawn/wallet-withdrawn.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit {

  constructor(
    private nav: NavController
  ) { }

  ngOnInit() {
  }

  deposit() {
    this.nav.push(WalletDepositComponent);
  }

  withdrawn() {
    this.nav.push(WalletWithdrawnComponent);
  }
}
