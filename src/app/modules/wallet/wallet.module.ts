import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { WalletHistoryComponent } from './wallet-history/wallet-history.component';
import { WalletDepositComponent } from './wallet-deposit/wallet-deposit.component';
import { WalletWithdrawnComponent } from './wallet-withdrawn/wallet-withdrawn.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateWalletComponent, , WalletHistoryComponent, WalletDepositComponent,  WalletWithdrawnComponent]
})
export class WalletModule { }
