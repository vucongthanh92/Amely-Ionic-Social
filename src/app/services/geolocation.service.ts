import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from "geofire";

@Injectable()
export class GeolocationService {

  private geoFireUsers: GeoFire;
  private geoFireShops: GeoFire;
  private geoFireOffers: GeoFire;

  constructor(
    public af: AngularFireDatabase
  ) { 
    this.geoFireUsers = new GeoFire(this.af.list('/users').query.ref);
    this.geoFireShops = new GeoFire(this.af.list('/shops').query.ref);
    this.geoFireOffers = new GeoFire(this.af.list('/offers').query.ref);
  }

  setLocation(username, lat, lng) {
    let locations;
    locations = {};
    locations[username] = [lat, lng];
    let geoHash = this.encodeGeohash([lat, lng], 10);
    this.af.database.ref('/users/' + username).update({ g: geoHash, l: [lat, lng] });
  }

  validateLocation = function (location) {
    var error;

    if (!Array.isArray(location)) {
      error = "location must be an array";
    }
    else if (location.length !== 2) {
      error = "expected array of length 2, got length " + location.length;
    }
    else {
      var latitude = location[0];
      var longitude = location[1];

      if (typeof latitude !== "number" || isNaN(latitude)) {
        error = "latitude must be a number";
      }
      else if (latitude < -90 || latitude > 90) {
        error = "latitude must be within the range [-90, 90]";
      }
      else if (typeof longitude !== "number" || isNaN(longitude)) {
        error = "longitude must be a number";
      }
      else if (longitude < -180 || longitude > 180) {
        error = "longitude must be within the range [-180, 180]";
      }
    }
    if (typeof error !== "undefined") {
      throw new Error("Invalid GeoFire location '" + location + "': " + error);
    }
  };

  encodeGeohash = function (location, precision) {
    var g_BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
    
    this.validateLocation(location);
    if (typeof precision !== "undefined") {
      if (typeof precision !== "number" || isNaN(precision)) {
        throw new Error("precision must be a number");
      }
      else if (precision <= 0) {
        throw new Error("precision must be greater than 0");
      }
      else if (precision > 22) {
        throw new Error("precision cannot be greater than 22");
      }
      else if (Math.round(precision) !== precision) {
        throw new Error("precision must be an integer");
      }
    }

    // Use the global precision default if no precision is specified
    precision = precision || 10;

    var latitudeRange = {
      min: -90,
      max: 90
    };
    var longitudeRange = {
      min: -180,
      max: 180
    };
    var hash = "";
    var hashVal = 0;
    var bits = 0;
    var even = true;

    while (hash.length < precision) {
      var val = even ? location[1] : location[0];
      var range = even ? longitudeRange : latitudeRange;
      var mid = (range.min + range.max) / 2;

      /* jshint -W016 */
      if (val > mid) {
        hashVal = (hashVal << 1) + 1;
        range.min = mid;
      }
      else {
        hashVal = (hashVal << 1) + 0;
        range.max = mid;
      }
      /* jshint +W016 */
      even = !even;
      if (bits < 4) {
        bits++;
      }
      else {
        bits = 0;
        hash += g_BASE32[hashVal];
        hashVal = 0;
      }
    }

    return hash;
  };

  getUsers(lat, lng) {
    var geoQuery = this.geoFireUsers.query({
      center: [lat, lng],
      radius: 5
    });
    return geoQuery;
  }

  getShops(lat, lng) {
    var geoQuery = this.geoFireShops.query({
      center: [lat, lng],
      radius: 5
    });
    return geoQuery;
  }

  getOffers(lat, lng) {
    var geoQuery = this.geoFireOffers.query({
      center: [lat, lng],
      radius: 5000
    });
    return geoQuery;
  }
}
