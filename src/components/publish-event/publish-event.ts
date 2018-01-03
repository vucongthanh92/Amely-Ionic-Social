import { Component } from '@angular/core';

/**
 * Generated class for the PublishEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publish-event',
  templateUrl: 'publish-event.html'
})
export class PublishEventComponent {

  text: string;

  constructor() {
    console.log('Hello PublishEventComponent Component');
    this.text = 'Hello World';
  }

}
