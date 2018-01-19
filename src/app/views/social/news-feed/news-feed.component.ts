import { Directive, Component, OnInit } from '@angular/core';
import { App, NavController, Refresher } from 'ionic-angular';
import { AddFeedComponent } from '../../../components/add-feed/add-feed.component';

interface CardInterface {
  name: string;
  location: string;
  day: string;
  month: string;
  year: string;
  img: string;
}

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
})


export class NewsFeedComponent implements OnInit {

  constructor(public nav: NavController, public appCtrl: App) {}

  ngOnInit() {
  }

  private cards: CardInterface[] = [
    {
      name: 'Innovation Showcase 2017',
      location: 'Canberra Fitters Workshop',
      day: '7',
      month: 'DEC',
      year: '2017',
      img: 'innovation-showcase.png'
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
      img: 'summer-sensations.png'
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

  ionViewDidLoad() {
    console.log('a1');
  }

  ionViewWillEnter() {
    console.log('a2');
  }

  ionViewDidEnter() {
    console.log('a3');
  }

  ionViewWillLeave() {
    console.log('a4');
  }

  ionViewDidLeave() {
    console.log('a5');
  }

  ionViewWillUnload() {
    console.log('a6');
  }
}
