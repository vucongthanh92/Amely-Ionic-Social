import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
} from '@ionic-native/google-maps';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  providers: [
    NativeGeocoder
  ]
})
export class MapComponent implements OnInit {
  @ViewChild('map') element;
  map: GoogleMap;
  callback: any;
  lat: number;
  lng: number;
  title: string;
  constructor(public navCtrl: NavController, private nav: NavController, public geolocation: Geolocation,
    public navParams: NavParams, platform: Platform, public plt: Platform, private nativeGeocoder: NativeGeocoder, private customSerive: CustomService) {
    this.callback = this.navParams.get('callback');
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  ngOnInit() {



  }

  ionViewDidLoad() {

  }
  loadMap() {


    this.geolocation.getCurrentPosition().then((resp) => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      // this.map = GoogleMaps.create('map', mapOptions);map: GoogleMap = this.googleMaps.create(this.element.nativeElement);
      this.map = GoogleMaps.create(this.element.nativeElement, mapOptions);
      // this.map = new GoogleMap('map');
      // Wait the MAP_READY before using any methods.

      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');

          // click
          this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
            (data) => {
              console.log("Click MAP");
              console.log(data);
              console.log(data.lat);
              console.log(data.lng);
              console.log(data[0]);
              console.log(data[0].lat);
              console.log(data[0].lng);
              this.nativeGeocoder.reverseGeocode(data[0].lat, data[0].lng)
                .then((result) => {
                  // { "subAdministrativeArea": "Quận Gò Vấp", "locality": "Hồ Chí Minh", "subLocality": "Phường 8", 
                  // "postalCode": "", "subThoroughfare": "7/2G", "administrativeArea": "Thành Phố Hồ Chí Minh", 
                  // "countryCode": "VN", "countryName": "Việt Nam", "thoroughfare": "Hẻm 23 Đường Số 21" }
                  const title = result[0].subThoroughfare + " " + result[0].thoroughfare + ", " + result[0].subLocality + " "
                    + result[0].subAdministrativeArea + ", " + result[0].administrativeArea + ", " + result[0].countryName;
                  console.log(title);

                  this.title = title;
                  this.lat = data[0].lat;
                  this.lng = data[0].lng;

                  this.map.addMarker({
                    title: title,
                    icon: 'blue',
                    animation: 'DROP',
                    position: {
                      lat: data[0].lat,
                      lng: data[0].lng
                    }
                  }).then(marker => { });



                })
                .catch((error: any) => console.log(error));
            }
          );

        });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  confirm() {
    if (!this.title || !this.lat || !this.lng) {
      this.customSerive.toastMessage("Bạn chưa chọn vị trí", 'bottom', 3000)
    } else {
      this.callback({ title: this.title, lat: this.lat, lng: this.lng }).then(() => {
        this.nav.pop();
      });
    }
  }
}
