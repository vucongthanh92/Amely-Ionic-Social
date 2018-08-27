import { CONFIG } from './../config';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api/services';
import { Http, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT' })
};
@Injectable()
export class SearchService {
  // private url = 'http://103.15.51.45:9210';
  private url = CONFIG.urlElastic;
  private headers;
  constructor(private api: ApiService, private http: Http) {
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json');
  }

  searchValues(content: string) {
    return this.api.search(content);
  }
  elasticSearch(body: SearchRequest) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/_search", body, { headers: this.headers })
        .map(response => {
          return response.json()
        })
        .subscribe(
          response => {
            resolve(response);
          }, error => {
            reject(error);
          }, () => console.log(333)
        );
    });
  }

  geoUser(from: number, size: number, usernameCurrent: string, findable_by: string, gte: number,
    lte: number, arrMood, gender: string, lat: number, lon: number) {
    let request = this.createRequestGeoUser(from, size, usernameCurrent, findable_by, gte,
      lte, arrMood, gender, lat, lon);
    // console.log(JSON.stringify(request));

    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/_search", request, { headers: this.headers })
        .map(response => {
          return response.json()
        })
        .subscribe(
          response => {
            resolve(response);
          }, error => {
            reject(error);
          }, () => console.log(333)
        );
    });
  }

  updateGeoUser(userID: string, lat: number, lng: number, yob: string, mood: string, findable_by: string, gender: string) {
    // console.log("lat            " + lat);
    // console.log("lng            " + lng);
    // console.log("yob            " + yob);
    // console.log("mood           " + mood);
    // console.log("findable_by    " + findable_by);
    // console.log("gender         " + gender);

    let request;
    if (lat && lng) request = { doc: { location: { lat: lat, lon: lng } } };

    if (findable_by) request = { doc: { findable_by: findable_by } };

    if (mood) request = { doc: { mood: mood } };

    if (yob && gender) request = { doc: { yob: yob, gender: gender } };

    if (yob && gender && mood) request = { doc: { yob: yob, gender: gender, mood: mood } };

    console.log(JSON.stringify(request));
    return new Promise((resolve, reject) => {
      this.http.post(this.url + `/users/user/${userID}/_update`, request, { headers: this.headers })
        .map(response => {
          return response.json()
        })
        .subscribe(
          response => {
            resolve(response);
          }, error => {
            reject(error);
          }
        );
    });
  }


  createRequestGeoUser(from: number, size: number, usernameCurrent: string, findable_by: string, gte: number,
    lte: number, arrMood, gender: string, lat: number, lon: number) {
    return {
      "from": from,
      "size": size,
      "query": {
        "filtered": {
          "filter": {
            "geo_distance": {
              "distance": "5km",
              "location": {
                "lat": lat,
                "lon": lon
              }
            }
          },
          "query": {
            "bool": {
              "must_not": [
                { "match": { "Username": usernameCurrent } },
                { "match": { "findable_by": findable_by } }
              ],
              "must": [
                {
                  "range": {
                    "yob": {
                      "gte": gte,
                      "lte": lte
                    }
                  }
                },
                { "match": { "gender": gender } },

                {
                  "bool": {
                    "should": arrMood
                  }
                }
              ]
            }
          }
        }
      },
      "sort": [
        {
          "_geo_distance": {
            "distance": "5km",
            "location": {
              "lat": lat,
              "lon": lon
            },
            "order": "asc",
            "unit": "km",
            "distance_type": "plane"
          }
        }
      ]
    }
  }

}


export class SearchRequest {
  from: number;
  size: number;
  query: Query;
  constructor(from: number, size: number, query: string) {
    this.from = from;
    this.size = size;
    this.query = new Query(query);
  }
}
class Query {
  query_string: Query_string;
  constructor(query_string) {
    this.query_string = new Query_string(query_string);
  }
}

class Query_string {
  query: string;
  fields: Array<String>;
  constructor(query) {
    this.query = query;
    this.fields = ["Username", "Title", "Phone", "Fullname", "Email"];
  }
}

export class SearchResponse {
  hits: Hit;
}
class Hit {
  total: number;
  max_score: number;
  hits: Array<HitEntry>;
}
export class HitEntry {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: Source;
  sort: Array<number>;
}
class Source {
  Title: string;
  Phone: string;
  Username: string;
  Fullname: string;
  Email: string;
  Price: string;
  Image: string;
  mood: string;
  gender: string;
  findable_by: string;
  yob: string;
}
