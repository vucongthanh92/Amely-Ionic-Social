import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupComponent } from './group/group.component';
import { MessageComponent } from '../message/message.component';
import { NotificationComponent } from '../notification/notification.component';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  @ViewChild('mySlider') slider: Slides;
  currentIndex = 0;
  constructor() { 
    this.currentIndex = 0;
  }

  ngOnInit() {
  }
  slideChanged() {
    this.currentIndex = this.slider.realIndex;
  }

  goToSlide(index) {
    this.slider.slideTo(index, 500);
  }
}
