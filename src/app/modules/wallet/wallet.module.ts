import { WalletComponent } from './wallet.component';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { WalletHistoryComponent } from './wallet-history/wallet-history.component';
import { WalletDepositComponent } from './wallet-deposit/wallet-deposit.component';
import { WalletWithdrawnComponent } from './wallet-withdrawn/wallet-withdrawn.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [CreateWalletComponent, WalletHistoryComponent, WalletDepositComponent, WalletWithdrawnComponent,WalletComponent],
  entryComponents: [CreateWalletComponent, WalletHistoryComponent, WalletDepositComponent, WalletWithdrawnComponent, WalletComponent]
})
export class WalletModule { }
