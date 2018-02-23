import { CustomService } from './../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, AlertController } from 'ionic-angular';
import { User } from '../../api/models';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html'
})
export class CreateEventComponent implements OnInit {

  private users: Array<User>;
  private members_chosen: Array<string> = [];
  private guests_chosen: Array<string> = [];

  private type_default = "Mặc định";
  private type_philanthropize = "Gây quỹ";
  private type_marry = "Đám cưới";
  private type_birthday = "Sinh nhật";
  public title_event = "Sự kiện";

  public type: string;
  constructor(public nav: NavController, public appCtrl: App, private alertCtrl: AlertController, private customSerivce: CustomService) {

  }

  ngOnInit() {
  }

  chooseMember() {
    this.users = this.customSerivce.friends;
    this.users = this.users.filter(e => !this.guests_chosen.some(e1 => e.guid + "" == e1));
    let alert = this.alertCtrl.create();
    alert.setTitle('Chọn danh sách thành viên');

    this.users.forEach(e => {
      alert.addInput({
        type: 'checkbox',
        label: e.fullname,
        value: e.guid + '',
        checked: this.members_chosen.some(e1 => e1 == e.guid + "")
      });
    });

    alert.addButton('Từ chối');
    alert.addButton({
      text: 'Đồng ý',
      handler: (data: any) => {
        console.log(data);
        if (this.type == this.type_marry && data.length > 1) {
          this.customSerivce.toastMessage('Đám cưới chỉ được mời thêm 1 thành viên', 'bottom', 2000)
        } else {
          this.members_chosen = data;
        }
      }
    });

    alert.present();
  }

  chooseGuest() {
    this.users = this.customSerivce.friends;
    this.users = this.users.filter(e => !this.members_chosen.some(e1 => e1 == e.guid + ""))
    let alert = this.alertCtrl.create();
    alert.setTitle('Chọn danh sách khách mời');
    this.users.forEach(e => {
      alert.addInput({
        type: 'checkbox',
        label: e.fullname,
        value: e.guid + '',
        checked: this.guests_chosen.some(e1 => e1 == e.guid + "")
      });
    });

    alert.addButton('Từ chối');
    alert.addButton({
      text: 'Đồng ý',
      handler: (data: any) => {
        console.log('Checkbox data:', data);
        this.guests_chosen = data;
      }
    });
    alert.present();
  }

  findUser(guid) {
    return this.customSerivce.friends.find(e => e.guid == guid);
  }

  chooseTemplate(type: string) {
    this.guests_chosen = [];
    this.members_chosen = [];
    switch (type) {
      case 'philanthropize':
        this.type = this.type_philanthropize;
        this.title_event = this.type_philanthropize;
        break;
      case 'default':
        this.type = this.type_default;
        this.title_event = this.type_default;
        break;
      case 'marry':
        this.type = this.type_marry;
        this.title_event = this.type_marry;
        break;
      case 'birthday':
        this.type = this.type_birthday;
        this.title_event = this.type_birthday;
        break;
    }
  }
}
