import { MapComponent } from './../map/map.component';
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
  public isCreatingFeed = false;
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
  constructor(public nav: NavController, public appCtrl: App, private alertCtrl: AlertController, private customService: CustomService,
    private eventService: EventsService, public params: NavParams, public loadingCtrl: LoadingController,
  ) {

  }

  ngOnInit() {
  }

  chooseMember() {
    this.users = this.customService.friends;
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
          this.customService.toastMessage('Đám cưới chỉ được mời thêm 1 thành viên', 'bottom', 2000)
        } else {
          this.members_chosen = data;
        }
      }
    });

    alert.present();
  }

  chooseGuest() {
    this.users = this.customService.friends;
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
    return this.customService.friends.find(e => e.guid == guid);
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

  chooseLocation() {
    this.appCtrl.getRootNav().push(MapComponent, { callback: this.callbackLocation })
  }

  callbackLocation = (_params) => {
    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        title: 'Xác nhận vị trí',
        message: _params.title,
        buttons: [
          {
            text: 'Từ chối',
            role: 'cancel'
          },
          {
            text: 'Chấp nhận',
            handler: () => {
              this.location = _params.title;
            }
          }
        ]
      });
      alert.present();
      resolve();
    });
  }

  createEvent() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loading.present();

    const string_datetime_start = this.date_start + "T" + this.time_start + ":00";
    const datetime_start = new Date(string_datetime_start).getTime();
    const string_datetime_end = this.date_end + "T" + this.time_end + ":00";
    const datetime_end = new Date(string_datetime_end).getTime();
    const current_timestamp = new Date().getTime();


    if (!this.name) {
      loading.dismiss();
      this.customService.toastMessage('Tên sự kiện không được để trống !', 'bottom', 2000);
    } else if (!this.description) {
      loading.dismiss();
      this.customService.toastMessage('Mô tả không được để trống !', 'bottom', 2000);
    } else if (!this.date_start) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn ngày bắt đầu !', 'bottom', 2000);
    } else if (!this.time_start) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn giờ bắt đầu !', 'bottom', 2000);
    } else if (current_timestamp > datetime_start) {
      loading.dismiss();
      this.customService.toastMessage('Thời gian bắt đầu phải lớn hơn thời gian hiện tại.', 'bottom', 3000);
    } else if (!this.date_end) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn ngày kết thúc !', 'bottom', 2000);
    } else if (!this.time_end) {
      loading.dismiss();
      this.customService.toastMessage('Chưa chọn giờ kết thúc !', 'bottom', 2000);
    } else if (datetime_end <= datetime_start) {
      loading.dismiss();
      this.customService.toastMessage('Thời gian kết thúc phải lớn hơn thời gian bắt đầu.', 'bottom', 3000);
    } else if (!this.location) {
      loading.dismiss();
      this.customService.toastMessage('Địa điểm không được để trống !', 'bottom', 2000);
    } else {
      this.isCreatingFeed = true;
      // template: string, title: string, start_date: string, end_date: string,
      //   country: string, location: string, description: string, has_inventory: string, status: string,
      //     event_type: string, owner_guid: number, members: string[], invites: string[]
      loading.dismiss();
      // const status = this.is_open ? "2" : "1";
      this.retryCreateEvent(5, datetime_start, datetime_end, loading)
    }

  }
  retryCreateEvent(retry, datetime_start, datetime_end, loading) {
    if (retry == 0) {
      loading.dismiss();
      this.customService.toastMessage("Không thể kết nối máy chủ , vui lòng thử lại.", 'bottom', 4000)
      return;
    }
    this.eventService.createEvent(this.type, this.name, (+datetime_start / 1000) + "", (+datetime_end / 1000) + "", "",
      this.location, this.description, this.has_inventory ? "1" : "", status, 'user', this.customService.user_current.guid,
      this.members_chosen, this.guests_chosen).subscribe(data => {
        this.isCreatingFeed = false;
        if (data.status) {
          setTimeout(() => {
            loading.dismiss();
          }, 8000);
          this.customService.toastMessage('Thành công', 'bottom', 2000);
          let callback = this.params.get("callback");
          callback().then(() => {
            this.nav.pop();
            
          });

        } else {
          loading.dismiss();
          this.customService.toastMessage('Thất bại. Vui lòng thử lại !', 'bottom', 2000);
        }
      }, err => { this.retryCreateEvent(--retry, datetime_start, datetime_end, loading) });
  }

  dismiss() {
    this.nav.pop();
  }

}
