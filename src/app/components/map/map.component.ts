import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
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

})
export class MapComponent implements OnInit {
  @ViewChild('map') element;
  map: GoogleMap;

  constructor(public navCtrl: NavController, private ngZone: NgZone, public geolocation: Geolocation,
    public navParams: NavParams, platform: Platform, public plt: Platform) {
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

          // Now you can use all methods safely.
          this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          }).then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                console.log();

              });

          });

          // click
          this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
            (data) => {
              console.log("Click MAP");
              console.log(data);
            }
          );

        });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
