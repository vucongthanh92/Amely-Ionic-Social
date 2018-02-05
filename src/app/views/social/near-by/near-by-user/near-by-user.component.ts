import { GeolocationService } from './../../../../services/geolocation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-near-by-user',
  templateUrl: './near-by-user.component.html'
})
export class NearByUserComponent implements OnInit {

  private lat: number;
  private lng: number;

  constructor(
    public geolocationService: GeolocationService
  ) { 
    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    let geoQueryUser = this.geolocationService.getUsers(this.lat, this.lng);
    geoQueryUser.on("key_entered", function (key, location, distance) {
      console.log(key + " user query at " + location + " (" + distance + " km from center)");
    });

    let geoQueryShop = this.geolocationService.getShops(this.lat, this.lng);
    geoQueryShop.on("key_entered", function (key, location, distance) {
      console.log(key + " shop query at " + location + " (" + distance + " km from center)");
    });


  }

  ngOnInit() {
  }

}
