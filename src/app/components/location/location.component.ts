import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
} from '@ionic-native/google-maps';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  providers: [
    NativeGeocoder
  ]
})
export class LocationComponent implements OnInit {
  @ViewChild('map') element;
  map: GoogleMap;
  lat: number;
  lng: number;
  title: string;

  constructor(public geolocation: Geolocation,
    public navParams: NavParams, platform: Platform, public plt: Platform) {
    this.lat = this.navParams.get('lat');
    this.lat = this.navParams.get('lng');
    this.title = this.navParams.get('title');
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  ngOnInit() {
  }
  loadMap() {


    this.geolocation.getCurrentPosition().then((resp) => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.lat,
            lng: this.lng
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create(this.element.nativeElement, mapOptions);

      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');
          this.map.clear();
          this.map.addMarker({
            title: this.title,
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: this.lat,
              lng: this.lng
            }
          }).then(marker => { });
        });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


}
