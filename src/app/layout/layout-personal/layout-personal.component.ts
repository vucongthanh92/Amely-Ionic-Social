import { PopoverController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { PersonalMenuComponent } from '../../views/personal/personal-menu/personal-menu.component';

@Component({
  selector: 'app-layout-personal',
  templateUrl: './layout-personal.component.html'
})
export class LayoutPersonalComponent implements OnInit {

  constructor(public popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  public openPopover(myEvent) {
    let popover = this.popoverCtrl.create(PersonalMenuComponent);
    popover.present({
      ev: myEvent
    });
  }
}
