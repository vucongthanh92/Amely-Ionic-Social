import { CustomService } from './../../../services/custom.service';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core'; ``
import { NavController, App, NavParams } from 'ionic-angular';
import { Event } from '../../../api/models';
@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html'
})
export class EventMenuComponent implements OnInit {
  private event: Event;
  constructor(private nav: NavController, private appCtrl: App, private navParams: NavParams, public eventSerive: EventsService, private customService: CustomService) {
    this.event = this.navParams.get('event');
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
    this.eventSerive.publicEvent(this.event.guid).subscribe(data => {
      if (data.status) {
        this.eventSerive.publish = 2;
      }
    })
  }
  closeOpenEvent() {

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
}
