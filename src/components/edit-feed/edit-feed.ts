import { Component } from '@angular/core';

/**
 * Generated class for the EditFeedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-feed',
  templateUrl: 'edit-feed.html'
})
export class EditFeedComponent {

  text: string;

  constructor() {
    console.log('Hello EditFeedComponent Component');
    this.text = 'Hello World';
  }

}
