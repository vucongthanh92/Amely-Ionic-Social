import { Component } from '@angular/core';

/**
 * Generated class for the VoteGroupAdminComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vote-group-admin',
  templateUrl: 'vote-group-admin.html'
})
export class VoteGroupAdminComponent {

  text: string;

  constructor() {
    console.log('Hello VoteGroupAdminComponent Component');
    this.text = 'Hello World';
  }

}
