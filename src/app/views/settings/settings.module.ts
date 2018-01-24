import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';

import { SettingsComponent } from './settings.component';
import { SettingSecurityComponent } from './setting-security/setting-security.component';
import { SettingGeneralComponent } from './setting-general/setting-general.component';
import { SettingPrivateComponent } from './setting-private/setting-private.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  declarations: [
  	SettingsComponent,
  	SettingSecurityComponent,
  	SettingGeneralComponent,
  	SettingPrivateComponent
  ],
  entryComponents: [
    SettingsComponent,
  	SettingSecurityComponent,
  	SettingGeneralComponent,
  	SettingPrivateComponent
  ]
})
export class SettingsModule { }
