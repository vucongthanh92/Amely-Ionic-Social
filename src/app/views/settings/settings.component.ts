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
  check_screen: string;
  tabGeneral = SettingGeneralComponent;
  tabPrivate = SettingPrivateComponent;
  tabSecurity = SettingSecurityComponent;
  public device: string;

  constructor(
    public nav: NavController, 
    public appCtrl: App, 
    public navParams:NavParams,
    private customService:CustomService) {
      this.device = localStorage.getItem("device");
    }

  ngOnInit() {
  }

  search() {
    this.is_search_show = !this.is_search_show;
    if (!this.is_search_show) {
      if (this.search_content!=undefined && this.search_content.length >= 3) {
        // this.customService.goToPageSearch(this.search_content, this.nav);
        this.nav.push(SearchComponent, { param: this.search_content, service: this })
      } else {
        this.customService.toastMessage('Tìm kiếm phải lớn hơn 3 ký tự', 'bottom', 3000)
      }
    }
  }
}
