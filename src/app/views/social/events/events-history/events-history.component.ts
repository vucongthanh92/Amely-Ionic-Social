import { CustomService } from './../../../../services/custom.service';
import { EventComponent } from './../../../../components/event/event.component';
import { User } from './../../../../api/models/user';
import { Event } from './../../../../api/models/event';
import { EventsService } from './../../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { App, LoadingController } from 'ionic-angular';

@Component({
  selector: 'app-events-history',
  templateUrl: './events-history.component.html'
})
export class EventsHistoryComponent implements OnInit {
  fakeUsers: Array<any> = new Array(5);
  public events: Array<Event>;
  public users: Array<User>;
  constructor(private eventsService: EventsService, private app: App, private customService: CustomService, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadData(5);
  }

  loadData(retry) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...',
    //   enableBackdropDismiss: true
    // });
    // loading.present();
    if (retry == 0) {
      // loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    setTimeout(() => {
      this.eventsService.getEvents(0, 9999, 'history').subscribe(data => {
        this.events = []
        if (data.events instanceof Array) {
          this.events = data.events;
        }
        // loading.dismiss();
        this.users = data.users;
      }, err => this.loadData(--retry))
    }, 2500);
    
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }

  getFullname(guid: number) {
    return this.users[guid].fullname;
  }
  goToPage(event_guid) {
    this.app.getRootNav().push(EventComponent, { is_user: false, event_guid: event_guid });
  }
}
