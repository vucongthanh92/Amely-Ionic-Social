/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { inline_response_200 } from '../models/inline-_response-_200';
import { body } from '../models/body';
import { user } from '../models/user';
import { result } from '../models/result';
import { inline_response_200_1 } from '../models/inline-_response-_200_1';
import { inline_response_200_2 } from '../models/inline-_response-_200_2';
import { body_1 } from '../models/body-_1';


@Injectable()
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body - undefined
   */
  loginResponse(body: body): Observable<HttpResponse<inline_response_200>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/authtoken`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: inline_response_200 = null;
        _body = _resp.body as inline_response_200
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  login(body: body): Observable<inline_response_200> {
    return this.loginResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return a friends list of an user (if not specified, the current logged in user)
   * @param user_guid - undefined
   */
  getFriendsResponse(userGuid: string): Observable<HttpResponse<user[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (userGuid != null) __params = __params.set("user_guid", userGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/friends`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: user[] = null;
        _body = _resp.body as user[]
        return _resp.clone({body: _body}) as HttpResponse<user[]>;
      })
    );
  }

  /**
   * Return a friends list of an user (if not specified, the current logged in user)
   * @param user_guid - undefined
   */
  getFriends(userGuid: string): Observable<user[]> {
    return this.getFriendsResponse(userGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a friend
   * @param guid - (Optional) If not presents, indicate that client is requesting the friends
   * list of the currently logged in user. If not, a friends list of user with queried GUID
   * will be returned if available.
   */
  deleteFriendResponse(guid: number): Observable<HttpResponse<result>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (guid != null) __params = __params.set("guid", guid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/friends`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: result = null;
        _body = _resp.body as result
        return _resp.clone({body: _body}) as HttpResponse<result>;
      })
    );
  }

  /**
   * Delete a friend
   * @param guid - (Optional) If not presents, indicate that client is requesting the friends
   * list of the currently logged in user. If not, a friends list of user with queried GUID
   * will be returned if available.
   */
  deleteFriend(guid: number): Observable<result> {
    return this.deleteFriendResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return friend request list of user
   */
  getFriendRequestResponse(): Observable<HttpResponse<result>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/friend_requests`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: result = null;
        _body = _resp.body as result
        return _resp.clone({body: _body}) as HttpResponse<result>;
      })
    );
  }

  /**
   * Return friend request list of user
   */
  getFriendRequest(): Observable<result> {
    return this.getFriendRequestResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a friend request
   * @param guid - (Optional) If not presents, indicate that client is requesting the friends
   * list of the currently logged in user. If not, a friends list of user with queried GUID
   * will be returned if available.
   */
  deleteFriendRequestResponse(guid: number): Observable<HttpResponse<result>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (guid != null) __params = __params.set("guid", guid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/friend_requests`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: result = null;
        _body = _resp.body as result
        return _resp.clone({body: _body}) as HttpResponse<result>;
      })
    );
  }

  /**
   * Delete a friend request
   * @param guid - (Optional) If not presents, indicate that client is requesting the friends
   * list of the currently logged in user. If not, a friends list of user with queried GUID
   * will be returned if available.
   */
  deleteFriendRequest(guid: number): Observable<result> {
    return this.deleteFriendRequestResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get the feeds of the requested GUID (currently logged in user if not
   * specified)
   * @param post_guid - Global Unique IDentity
   */
  getFeedResponse(postGuid: number): Observable<HttpResponse<inline_response_200_1>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (postGuid != null) __params = __params.set("post_guid", postGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/feeds`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: inline_response_200_1 = null;
        _body = _resp.body as inline_response_200_1
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_1>;
      })
    );
  }

  /**
   * get the feeds of the requested GUID (currently logged in user if not
   * specified)
   * @param post_guid - Global Unique IDentity
   */
  getFeed(postGuid: number): Observable<inline_response_200_1> {
    return this.getFeedResponse(postGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * owner_guid: wall
   * empty owner_guid: timeline of user
   * @param body - undefined
   */
  getFeedsResponse(body: body_1): Observable<HttpResponse<inline_response_200_2>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/feeds`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: inline_response_200_2 = null;
        _body = _resp.body as inline_response_200_2
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_2>;
      })
    );
  }

  /**
   * owner_guid: wall
   * empty owner_guid: timeline of user
   * @param body - undefined
   */
  getFeeds(body: body_1): Observable<inline_response_200_2> {
    return this.getFeedsResponse(body).pipe(
      map(_r => _r.body)
    );
  }}

export module ApiService {
}
