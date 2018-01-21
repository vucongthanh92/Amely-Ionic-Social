import { Component, OnInit } from '@angular/core';
import { FindFriendComponent } from '../find-friend/find-friend.component';
import { NoteFriendComponent } from '../note-friend/note-friend.component';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html'
})
export class AddFriendComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  tab1Root = FindFriendComponent;
  tab2Root = NoteFriendComponent;

}
