import { Component } from '@angular/core';

/**
 * Generated class for the DeleteGroupComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'delete-group',
  templateUrl: 'delete-group.html'
})
export class DeleteGroupComponent {

  text: string;

  constructor() {
    console.log('Hello DeleteGroupComponent Component');
    this.text = 'Hello World';
  }

}
