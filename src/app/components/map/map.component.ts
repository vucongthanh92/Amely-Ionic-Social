import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
} from '@ionic-native/google-maps';

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
    public navParams: NavParams, platform: Platform, public plt: Platform, private nativeGeocoder: NativeGeocoder) {
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
              this.nativeGeocoder.reverseGeocode(data.lat, data.lng)
                .then((result: NativeGeocoderReverseResult) => {
                  const title = result.locality + " " + result.subAdministrativeArea + " " + result.countryName;
                  console.log(title);

                  this.callback({ title: title, lat: data.lat, lng: data.lng }).then(() => {
                    this.nav.pop();
                  });
                })
                .catch((error: any) => console.log(error));
            }
          );

        });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
