import { Directive, Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { AddFeedComponent } from '../../../components/add-feed/add-feed.component';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
})


export class NewsFeedComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  private cards = [
    {
      name: 'Innovation Showcase 2017',
      location: 'Canberra Fitters Workshop',
      day: '7',
      month: 'DEC',
      year: '2017',
      img: 'innovation-showcase.png',
      title: 'abc'
    },
    {
      name: 'Heritage Tours',
      location: 'Canberra Glassworks',
      day: '25',
      month: 'NOV',
      year: '2017',
      img: 'heritage-tours.png'
    },
    {
      name: 'Summer Sensations',
      location: 'Canberra Glassworks',
      day: '10',
      month: 'JAN',
      year: '2018',
      img: 'summer-sensations.png',
      title: 'def'
    },
    {
      name: 'Renewable Energy Day 2017',
      location: 'Visit renewable energy sites throughout the ACT',
      day: '25',
      month: 'NOV',
      year: '2017',
      img: 'renewable-energy-day.png'
    }
  ];

  addNewFeed() {
  	this.appCtrl.getRootNav().setRoot(AddFeedComponent);
  }

}
