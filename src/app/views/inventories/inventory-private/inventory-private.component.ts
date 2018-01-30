import { User } from './../../../api/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-private',
  templateUrl: './inventory-private.component.html',
})
export class InventoryPrivateComponent implements OnInit {
  inventory_type = "user";
  userCurrent: User;
  constructor() {
    this.userCurrent = JSON.parse(localStorage.getItem("loggin_user"));
  }

  ngOnInit() {
  }

}
