import { EventsService } from './../../services/events.service';
import { CustomService } from './../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { App, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
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

  public name: string;
  public description: string;
  public has_inventory: boolean;
  public time_start;
  public time_end;
  public date_start;
  public date_end;
  public location: string;
  public is_open: boolean;
  public type = this.type_default;
  constructor(public nav: NavController, public appCtrl: App, private alertCtrl: AlertController, private customSerivce: CustomService,
    private eventService: EventsService, public params: NavParams, public loadingCtrl: LoadingController,
  ) {

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

  createEvent() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const string_datetime_start = this.date_start + " " + this.time_start;
    const datetime_start = new Date(Date.parse(string_datetime_start)).getTime();

    const string_datetime_end = this.date_end + " " + this.time_end;
    const datetime_end = new Date(Date.parse(string_datetime_end)).getTime();

    if (!this.name) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Tên sự kiện không được để trống !', 'bottom', 2000);
    } else if (!this.description) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Mô tả không được để trống !', 'bottom', 2000);
    } else if (!this.date_start) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Chưa chọn ngày bắt đầu !', 'bottom', 2000);
    } else if (!this.time_start) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Chưa chọn giờ bắt đầu !', 'bottom', 2000);
    } else if (Date.now() > datetime_start) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Thời gian bắt đầu phải lớn hơn thời gian hiện tại.', 'bottom', 3000);
    } else if (!this.date_end) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Chưa chọn ngày kết thúc !', 'bottom', 2000);
    } else if (!this.time_end) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Chưa chọn giờ kết thúc !', 'bottom', 2000);
    } else if (datetime_end <= datetime_start) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Thời gian kết thúc phải lớn hơn thời gian bắt đầu.', 'bottom', 3000);
    } else if (!this.location) {
      loading.dismiss();      
      this.customSerivce.toastMessage('Địa điểm không được để trống !', 'bottom', 2000);
    } else {
      // template: string, title: string, start_date: string, end_date: string,
      //   country: string, location: string, description: string, has_inventory: string, status: string,
      //     event_type: string, owner_guid: number, members: string[], invites: string[]
      loading.dismiss();
  

      const status = this.is_open ? "2" : "1";
      this.eventService.createEvent(this.type, this.name, (datetime_start / 1000) + "", (datetime_end / 1000) + "", "",
        this.location, this.description, this.has_inventory ? "1" : "", status, 'user', this.customSerivce.user_current.guid,
        this.members_chosen, this.guests_chosen).subscribe(data => {
          if (data.status) {
            this.customSerivce.toastMessage('Thành công', 'bottom', 2000);
            let callback = this.params.get("callback");
            callback().then(() => {
              this.nav.pop();
            });

          } else {
            this.customSerivce.toastMessage('Thất bại. Vui lòng thử lại !', 'bottom', 2000);
          }
        },err=>{
          this.customSerivce.toastMessage('Thất bại. Vui lòng thử lại !', 'bottom', 2000);
        });
    }

  }
}
