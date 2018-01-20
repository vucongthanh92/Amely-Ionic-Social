import { Component, OnInit } from '@angular/core';
import { App, NavController, Refresher, ViewController } from 'ionic-angular';
import { EventsComponent } from '../../views/social/events/events.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html'
})
export class CreateEventComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }
}
