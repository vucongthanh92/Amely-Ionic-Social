import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingSecurityComponent } from './setting-security/setting-security.component';
import { SettingGeneralComponent } from './setting-general/setting-general.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SettingsComponent, SettingSecurityComponent, SettingGeneralComponent]
})
export class SettingsModule { }
