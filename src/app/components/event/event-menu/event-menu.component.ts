import { CustomService } from './../../../services/custom.service';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core'; ``
import { NavParams, App, LoadingController, NavController } from 'ionic-angular';
import { Event } from '../../../api/models';
import { QrComponent } from '../../qr/qr.component';

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html'
})
export class EventMenuComponent implements OnInit {
  private event: Event;

  //"history"  "guest" "member" "visitor"
  public type: string;
  public is_user_current: boolean = false;
  constructor(private navParams: NavParams, public eventSerive: EventsService, private customService: CustomService, private appCtrl: App,
    public loadingCtrl: LoadingController, private nav: NavController) {
    this.event = this.navParams.get('event');
    this.type = this.navParams.get('type');

    this.is_user_current = this.customService.user_current.guid == this.event.creator.guid;
    console.log(this.customService.user_current.guid);
    console.log(this.event.creator.guid);

  }

  ngOnInit() {
  }

  /**
      * 0: close 
      * 1: open 
      * 2: open and publish
      * 3: close and publish
    **/
  publicEvent() {
    this.nav.pop();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();

    this.eventSerive.publicEvent(this.event.guid).subscribe(data => {
      if (data.status) {
        loading.dismiss();
        this.eventSerive.publish = 2;
      } else loading.dismiss(); this.customService.toastMessage('Công bố thất bại , vui lòng thử lại .', 'bottom', 3000)
    },
      err => {
        this.customService.toastMessage('Đăng ký thất bại , vui lòng thử lại .', 'bottom', 3000)
      })
  }
  closeOpenEvent() {
    this.nav.pop();
    // if (this.event) {
    //   console.log(this.event);

    // }
    if (this.eventSerive.publish == 1 || this.eventSerive.publish == 2) {
      // close
      this.eventSerive.openCloseEvent(this.event.location, this.event.guid, this.event.description, this.event.start_date + '', this.event.end_date + '', this.event.country,
        this.event.title, this.event.template, this.event.has_inventory, "1", 'user', this.event.owner_user, this.event.invites).subscribe(data => {
          if (data.status) {
            if (this.eventSerive.publish == 1) {
              this.eventSerive.publish = 0;
            } else {
              this.eventSerive.publish = 3;
            }
          }
        })
    } else {
      // open
      this.eventSerive.openCloseEvent(this.event.location, this.event.guid, this.event.description, this.event.start_date + '', this.event.end_date + '', this.event.country,
        this.event.title, this.event.template, this.event.has_inventory, "2", 'user', this.event.owner_user, this.event.invites).subscribe(data => {
          if (data.status) {
            if (this.eventSerive.publish == 0) {
              this.eventSerive.publish = 1;
            } else if (this.eventSerive.publish == 3) {
              this.eventSerive.publish = 2;
            }
          }
        })
    }
  }

  openQR() {
    this.appCtrl.getRootNav().push(QrComponent, { code: this.customService.url_qr + "event/" + this.event.guid })
    this.nav.pop();
  }
}
