import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api/services';
import { Http, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT' })
};
@Injectable()
export class SearchService {
  private url = 'http://103.15.51.45:9210/_search';
  constructor(private api: ApiService, private http: Http) {
  }

  searchValues(content: string) {
    return this.api.search(content);
  }


  elasticSearch(body: SearchRequest) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append("Content-Type", "application/json; charset=utf-8");
    // headers.append("Accept", "/");
    // headers.append("Access-Control-Allow-Credentials", "true");
    // headers.append("Upgrade-Insecure-Requests", "1");
    // headers.append("withCredentials", "true");
    // // headers.append("Access-Control-Allow-Origin", "http://localhost:8100 28");
    // headers.append("Access-Control-Allow-Credentials", "true");
    // headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization, Upgrade-Insecure-Requests");

    return new Promise((resolve, reject) => {
      this.http.post(this.url, body, { headers: headers })
        .map(response => {
          console.log(response);

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
}
class Source {
  Title: string;
  Phone: string;
  Username: string;
  Fullname: string;
  Email: string;
  Price: string;
  Image: string;
}