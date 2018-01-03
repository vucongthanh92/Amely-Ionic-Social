import { Component } from '@angular/core';

/**
 * Generated class for the DeleteEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'delete-event',
  templateUrl: 'delete-event.html'
})
export class DeleteEventComponent {

  text: string;

  constructor() {
    console.log('Hello DeleteEventComponent Component');
    this.text = 'Hello World';
  }

}
