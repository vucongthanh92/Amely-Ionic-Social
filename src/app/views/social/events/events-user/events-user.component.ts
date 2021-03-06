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
  fakeUsers: Array<any> = new Array(5);
  public events: Array<Event>;
  public users: Array<User>;
  constructor(
    private app: App,
    private eventsService: EventsService,
    private customService: CustomService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadEvent(5,null);
  }

  loadEvent(retry, loading) {
   
    if (retry == 0) {
      if (loading) {
        loading.dismiss();
      }
      
      this.customService.toastMessage('Kết nối máy chủ thất bại. Vui lòng thử lại !!', 'bottom', 4000);
      return;
    }
    setTimeout(() => {
      this.eventsService.getEvents(0, 9999, 'member').subscribe(data => {
        this.events = []
        if (data.events instanceof Array) {
          this.events = data.events;
        }
        if (loading) {
          loading.dismiss();
        }
        this.users = data.users;
      }, err => this.loadEvent(--retry, loading))
    }, 2500);
   
  }

  getDateCreate(time: number) {
    return new Date(time * 1000);
  }

  getFullname(guid: number) {
    return this.users[guid].fullname;
  }

  goToPage(event_guid) {
    this.app.getRootNav().push(EventComponent, { is_user: true, event_guid: event_guid, callback: this.myCallbackFunction });
  }
  createEvent() {
    this.app.getRootNav().push(CreateEventComponent, { callback: this.myCallbackFunction });
  }

  myCallbackFunction = () => {
    return new Promise((resolve, reject) => {
       let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss: true
    });
    loading.present();
      this.loadEvent(5,loading);
      resolve();
    });
  }
}
