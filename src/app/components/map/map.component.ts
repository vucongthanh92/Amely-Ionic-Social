import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

declare var google;
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

  constructor(public navCtrl: NavController, private ngZone: NgZone, public geolocation: Geolocation,
    public navParams: NavParams, platform: Platform, public plt: Platform, private nativeGeocoder: NativeGeocoder) {
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
              console.log(data.lat);
              console.log(data.lng);
              this.nativeGeocoder.reverseGeocode(data.lat, data.lng)
                .then((result: NativeGeocoderReverseResult) => {
                  console.log(JSON.stringify(result));
                  console.log(result.locality + " " + result.subAdministrativeArea + " " + result.countryName);

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
