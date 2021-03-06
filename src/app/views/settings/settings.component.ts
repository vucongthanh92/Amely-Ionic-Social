import { SearchComponent } from './../../components/search/search.component';
import { CustomService } from './../../services/custom.service';
import { SettingSecurityComponent } from './setting-security/setting-security.component';
import { SettingPrivateComponent } from './setting-private/setting-private.component';
import { Component, OnInit, Input } from '@angular/core';
import { SettingGeneralComponent } from './setting-general/setting-general.component';
import { App, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  @Input('search') search_content: string;
  is_search_show: boolean;
  tabGeneral = SettingGeneralComponent;
  tabPrivate = SettingPrivateComponent;
  tabSecurity = SettingSecurityComponent;

  constructor(
    public nav: NavController, 
    public appCtrl: App, 
    public navParams:NavParams,
    private customService:CustomService) {
      
    }

  ngOnInit() {
  }

  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content) {
        // this.customService.goToPageSearch(this.search_content, this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      }
    }
  }
}
