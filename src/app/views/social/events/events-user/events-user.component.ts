import { CustomService } from './../../../../services/custom.service';
import { EventComponent } from './../../../../components/event/event.component';
import { User } from './../../../../api/models/user';
import { Event } from './../../../../api/models/event';
import { EventsService } from './../../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { App, LoadingController } from 'ionic-angular';
import { CreateEventComponent } from '../../../../components/create-event/create-event.component';

@Component({
  selector: 'app-events-user',
  templateUrl: './events-user.component.html'
})
export class EventsUserComponent implements OnInit {
  public events: Array<Event>;
  public users: Array<User>;
  constructor(
    private app: App,
    private eventsService: EventsService,
    private customService: CustomService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadEvent(5);
  }

  loadEvent(retry) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    this.eventsService.getEvents(0, 9999, 'member').subscribe(data => {
      if (data.events instanceof Array) {
        this.events = data.events;
      }
      loading.dismiss();
      this.users = data.users;
    }, err => this.loadEvent(--retry))
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }

  getFullname(guid: number) {
    return this.users[guid].fullname;
  }

  goToPage(event_guid) {
    this.app.getRootNav().push(EventComponent, { is_user: true, event_guid: event_guid });
  }
  createEvent() {
    this.app.getRootNav().push(CreateEventComponent, { callback: this.myCallbackFunction });
  }

  myCallbackFunction = () => {
    return new Promise((resolve, reject) => {
      this.loadEvent(5);
      resolve();
    });
  }
}
