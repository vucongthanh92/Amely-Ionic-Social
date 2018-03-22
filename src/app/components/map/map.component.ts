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

  constructor(public navCtrl: NavController, private ngZone: NgZone, private geolocation: Geolocation,
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

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    // this.map = GoogleMaps.create('map', mapOptions);map: GoogleMap = this.googleMaps.create(this.element.nativeElement);
    this. map = GoogleMaps.create(this.element.nativeElement);
    // this.map = new GoogleMap('map');
    // Wait the MAP_READY before using any methods.
    console.log(12321);

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
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
            marker.on(GoogleMapsEvent.MAP_CLICK).subscribe((a, b) => {
              alert(a)
              alert(b)
            })
          });

      });


  }
}
