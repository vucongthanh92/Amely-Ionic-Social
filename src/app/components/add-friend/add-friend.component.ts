import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FindFriendComponent } from '../find-friend/find-friend.component';
import { NoteFriendComponent } from '../note-friend/note-friend.component';
import { Tabs, ViewController } from 'ionic-angular';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html'
})
export class AddFriendComponent implements OnInit {
  @ViewChild('myTabs') tabRef: Tabs; position_selected: number;

  private callback: any;
  tab1Root = FindFriendComponent;
  tab2Root = NoteFriendComponent;
  
  constructor(private navParams: NavParams, public viewCtrl: ViewController) {
    this.position_selected = this.navParams.get('position_selected');
    this.callback = this.navParams.get('callback')
    // this.tabRef.select(this.position_selected);
  }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    this.tabRef.select(this.position_selected);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  onTabGotClosed(e){
    if (e) {
      this.viewCtrl.dismiss();
    }
    console.log(e);
    
  }

}
