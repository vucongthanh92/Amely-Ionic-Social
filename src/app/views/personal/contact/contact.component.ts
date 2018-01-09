import { Component, OnInit } from '@angular/core';
import { GroupComponent } from './group/group.component';
import { MessageComponent } from '../message/message.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  tab1Root = MessageComponent;
  constructor() { }

  ngOnInit() {
  }

  appType = 'Paid';
  safari = 'Shared Links';
  weather = 'sunny';

  apps: any = {
    'Paid': [
      {
        name: 'Monopoly',
        price: '$0.99'
      },
      {
        name: 'Angry Birds',
        price: '$2.99'
      }
    ],
    'Free': [
      {
        name: 'Snapchat',
        price: 'GET'
      },
      {
        name: 'Instagram',
        price: 'OPEN'
      }
    ],
    'Top': [
      {
        name: 'Spotify',
        price: 'OPEN'
      },
      {
        name: 'Pandora',
        price: 'GET'
      }
    ]
  };

  items: any = {
    'Bookmarks': [
      {
        name: 'Favorites',
        icon: 'ios-star-outline'
      },
      {
        name: 'History',
        icon: 'ios-clock-outline'
      }
    ],
    'Reading List': [
      {
        name: 'Terms of Service',
        icon: 'create'
      },
      {
        name: 'User Guide',
        icon: 'book'
      }
    ],
    'Shared Links': [
      {
        name: 'Ionic Framework',
        icon: 'ionic'
      },
      {
        name: 'Learn Angular',
        icon: 'logo-angular'
      }
    ]
  };

}
