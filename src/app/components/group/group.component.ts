import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newfeedsPage = true;
  membersPage = false;
  groupTab = 'newfeed';

  goToPage(value) {
    switch (value) {
      case 'newfeed':
        this.newfeedsPage = true;
        this.membersPage = false;
        break;
      case 'members':
        this.newfeedsPage = false;
        this.membersPage = true;
        break;
      default:
        break;
    }
  }
}
