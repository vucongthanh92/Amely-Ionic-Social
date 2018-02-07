import { GeolocationService } from './../../../../services/geolocation.service';
import { OffersService } from './../../../../services/offers.service';
import { Offer } from './../../../../api/models/offer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-search',
  templateUrl: './offers-search.component.html'
})
export class OffersSearchComponent implements OnInit {

  private lat: number;
  private lng: number;

  public offers: Array<Offer>;
  constructor(
    private geolocationService: GeolocationService,
    private offersServie: OffersService
  ) {
    this.lat = Number(localStorage.getItem("lat"));
    this.lng = Number(localStorage.getItem("lng"));
    let geoQueryOffer = this.geolocationService.getOffers(this.lat, this.lng);
    geoQueryOffer.on("key_entered", function (key, location, distance) {
      // console.log(key + " user query at " + location + " (" + distance + " km from center)");
    });
  }

  ngOnInit() {
    this.offersServie.getOffers(0, 9999, 'friends').subscribe(data => {
      if (data instanceof Array) {
        this.offers = data;
      }
    })
  }

  

}
