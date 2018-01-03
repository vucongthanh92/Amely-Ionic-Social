import { Component } from '@angular/core';

/**
 * Generated class for the EditEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-event',
  templateUrl: 'edit-event.html'
})
export class EditEventComponent {

  text: string;

  constructor() {
    console.log('Hello EditEventComponent Component');
    this.text = 'Hello World';
  }

}
