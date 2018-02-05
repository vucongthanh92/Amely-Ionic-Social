import { SettingSecurityComponent } from './setting-security/setting-security.component';
import { SettingPrivateComponent } from './setting-private/setting-private.component';
import { Component, OnInit } from '@angular/core';
import { SettingGeneralComponent } from './setting-general/setting-general.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  tabGeneral = SettingGeneralComponent;
  tabPrivate = SettingPrivateComponent;
  tabSecurity = SettingSecurityComponent;
  constructor() { }

  ngOnInit() {
  }

}
