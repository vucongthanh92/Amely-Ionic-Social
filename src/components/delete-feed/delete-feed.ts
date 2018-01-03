import { Component } from '@angular/core';

/**
 * Generated class for the DeleteFeedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'delete-feed',
  templateUrl: 'delete-feed.html'
})
export class DeleteFeedComponent {

  text: string;

  constructor() {
    console.log('Hello DeleteFeedComponent Component');
    this.text = 'Hello World';
  }

}
