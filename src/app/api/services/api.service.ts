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

import { DefaultResponse } from '../models/default-response';
import { body } from '../models/body';
import { body_1 } from '../models/body-_1';
import { Category } from '../models/category';
import { body_2 } from '../models/body-_2';
import { body_3 } from '../models/body-_3';
import { inline_response_200 } from '../models/inline-_response-_200';
import { inline_response_200_1 } from '../models/inline-_response-_200_1';
import { body_5 } from '../models/body-_5';
import { body_4 } from '../models/body-_4';
import { body_6 } from '../models/body-_6';
import { User } from '../models/user';
import { Group } from '../models/group';
import { inline_response_200_2 } from '../models/inline-_response-_200_2';
import { body_7 } from '../models/body-_7';
import { body_8 } from '../models/body-_8';
import { Item } from '../models/item';
import { body_9 } from '../models/body-_9';
import { body_10 } from '../models/body-_10';
import { body_11 } from '../models/body-_11';
import { Product } from '../models/product';
import { body_12 } from '../models/body-_12';
import { guid } from '../models/guid';
import { inline_response_200_3 } from '../models/inline-_response-_200_3';
import { inline_response_200_4 } from '../models/inline-_response-_200_4';
import { body_14 } from '../models/body-_14';
import { body_13 } from '../models/body-_13';
import { body_15 } from '../models/body-_15';
import { inline_response_200_5 } from '../models/inline-_response-_200_5';
import { body_16 } from '../models/body-_16';
import { inline_response_200_6 } from '../models/inline-_response-_200_6';
import { inline_response_200_7 } from '../models/inline-_response-_200_7';
import { body_18 } from '../models/body-_18';
import { body_17 } from '../models/body-_17';
import { body_19 } from '../models/body-_19';
import { Shop } from '../models/shop';


@Injectable()
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Return acceptances list
   * @param type - undefined
   */
  getAcceptanceResponse(type: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (type != null) __params = __params.set("type", type.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/acceptance`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Return acceptances list
   * @param type - undefined
   */
  getAcceptance(type: string): Observable<DefaultResponse> {
    return this.getAcceptanceResponse(type).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete acceptance
   * @param type - undefined
   * @param guid - undefined
   */
  deleteAcceptanceResponse(params: ApiService.DeleteAcceptanceParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.type != null) __params = __params.set("type", params.type.toString());
    if (params.guid != null) __params = __params.set("guid", params.guid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/acceptance`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Delete acceptance
   * @param type - undefined
   * @param guid - undefined
   */
  deleteAcceptance(params: ApiService.DeleteAcceptanceParams): Observable<DefaultResponse> {
    return this.deleteAcceptanceResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Approve invitation request
   * @param body - undefined
   */
  createApprovalResponse(body: body): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/approval`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Approve invitation request
   * @param body - undefined
   */
  createApproval(body: body): Observable<DefaultResponse> {
    return this.createApprovalResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete approval
   * @param to_guid - undefined
   * @param invitation_type - undefined
   * @param from_guid - undefined
   */
  deleteApprovalResponse(params: ApiService.DeleteApprovalParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.toGuid != null) __params = __params.set("to_guid", params.toGuid.toString());
    if (params.invitationType != null) __params = __params.set("invitation_type", params.invitationType.toString());
    if (params.fromGuid != null) __params = __params.set("from_guid", params.fromGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/approval`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Delete approval
   * @param to_guid - undefined
   * @param invitation_type - undefined
   * @param from_guid - undefined
   */
  deleteApproval(params: ApiService.DeleteApprovalParams): Observable<DefaultResponse> {
    return this.deleteApprovalResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  loginResponse(body: body_1): Observable<HttpResponse<DefaultResponse>> {
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  login(body: body_1): Observable<DefaultResponse> {
    return this.loginResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get all categories
   * @param body - undefined
   */
  getCategoriesResponse(body: body_2): Observable<HttpResponse<Category[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/categories`,
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
        let _body: Category[] = null;
        _body = _resp.body as Category[]
        return _resp.clone({body: _body}) as HttpResponse<Category[]>;
      })
    );
  }

  /**
   * get all categories
   * @param body - undefined
   */
  getCategories(body: body_2): Observable<Category[]> {
    return this.getCategoriesResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get info of a comment
   * @param comment_guid - Global Unique IDentity
   */
  getCommentResponse(commentGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (commentGuid != null) __params = __params.set("comment_guid", commentGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/comments`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * get info of a comment
   * @param comment_guid - Global Unique IDentity
   */
  getComment(commentGuid: number): Observable<DefaultResponse> {
    return this.getCommentResponse(commentGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get all comment of the requested feed_guid
   * @param type - undefined
   * @param post_guid - Global Unique IDentity
   * @param offset - undefined
   * @param limit - undefined
   */
  getCommentsResponse(params: ApiService.GetCommentsParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.type != null) __params = __params.set("type", params.type.toString());
    if (params.postGuid != null) __params = __params.set("post_guid", params.postGuid.toString());
    if (params.offset != null) __params = __params.set("offset", params.offset.toString());
    if (params.limit != null) __params = __params.set("limit", params.limit.toString());
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/comments`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * get all comment of the requested feed_guid
   * @param type - undefined
   * @param post_guid - Global Unique IDentity
   * @param offset - undefined
   * @param limit - undefined
   */
  getComments(params: ApiService.GetCommentsParams): Observable<DefaultResponse> {
    return this.getCommentsResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * insert a new comment
   * @param body - undefined
   */
  createCommentResponse(body: body_3): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/comments`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * insert a new comment
   * @param body - undefined
   */
  createComment(body: body_3): Observable<DefaultResponse> {
    return this.createCommentResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * delete comment
   * @param guid - Global Unique IDentity
   */
  deleteCommentResponse(guid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (guid != null) __params = __params.set("guid", guid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/comments`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * delete comment
   * @param guid - Global Unique IDentity
   */
  deleteComment(guid: number): Observable<DefaultResponse> {
    return this.deleteCommentResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param entities_guid - Global Unique IDentity
   */
  deleteImageProductResponse(entitiesGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (entitiesGuid != null) __params = __params.set("entities_guid", entitiesGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/delete_image_product`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param entities_guid - Global Unique IDentity
   */
  deleteImageProduct(entitiesGuid: number): Observable<DefaultResponse> {
    return this.deleteImageProductResponse(entitiesGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get the feeds of the requested GUID (currently logged in user if not
   * specified)
   * @param post_guid - Global Unique IDentity
   */
  getFeedResponse(postGuid: number): Observable<HttpResponse<inline_response_200>> {
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
        let _body: inline_response_200 = null;
        _body = _resp.body as inline_response_200
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200>;
      })
    );
  }

  /**
   * get the feeds of the requested GUID (currently logged in user if not
   * specified)
   * @param post_guid - Global Unique IDentity
   */
  getFeed(postGuid: number): Observable<inline_response_200> {
    return this.getFeedResponse(postGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * owner_guid: wall
   * empty owner_guid: timeline of user
   * @param body - undefined
   */
  getFeedsResponse(body: body_5): Observable<HttpResponse<inline_response_200_1>> {
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
        let _body: inline_response_200_1 = null;
        _body = _resp.body as inline_response_200_1
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_1>;
      })
    );
  }

  /**
   * owner_guid: wall
   * empty owner_guid: timeline of user
   * @param body - undefined
   */
  getFeeds(body: body_5): Observable<inline_response_200_1> {
    return this.getFeedsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Post a new feed (Can't upload image)
   * @param body - undefined
   */
  createFeedResponse(body: body_4): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Post a new feed (Can't upload image)
   * @param body - undefined
   */
  createFeed(body: body_4): Observable<DefaultResponse> {
    return this.createFeedResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete a posted feed
   * @param post_guid - Global Unique IDentity
   */
  deleteFeedResponse(postGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (postGuid != null) __params = __params.set("post_guid", postGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Delete a posted feed
   * @param post_guid - Global Unique IDentity
   */
  deleteFeed(postGuid: number): Observable<DefaultResponse> {
    return this.deleteFeedResponse(postGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Update a posted feed
   * @param body - undefined
   */
  updateFeedResponse(body: body_6): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Update a posted feed
   * @param body - undefined
   */
  updateFeed(body: body_6): Observable<DefaultResponse> {
    return this.updateFeedResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return friend request list of user
   */
  getFriendRequestResponse(): Observable<HttpResponse<DefaultResponse>> {
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Return friend request list of user
   */
  getFriendRequest(): Observable<DefaultResponse> {
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
  deleteFriendRequestResponse(guid: number): Observable<HttpResponse<DefaultResponse>> {
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Delete a friend request
   * @param guid - (Optional) If not presents, indicate that client is requesting the friends
   * list of the currently logged in user. If not, a friends list of user with queried GUID
   * will be returned if available.
   */
  deleteFriendRequest(guid: number): Observable<DefaultResponse> {
    return this.deleteFriendRequestResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return a friends list of an user (if not specified, the current logged in user)
   * @param user_guid - undefined
   */
  getFriendsResponse(userGuid: number): Observable<HttpResponse<User[]>> {
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
        let _body: User[] = null;
        _body = _resp.body as User[]
        return _resp.clone({body: _body}) as HttpResponse<User[]>;
      })
    );
  }

  /**
   * Return a friends list of an user (if not specified, the current logged in user)
   * @param user_guid - undefined
   */
  getFriends(userGuid: number): Observable<User[]> {
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
  deleteFriendResponse(guid: number): Observable<HttpResponse<DefaultResponse>> {
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Delete a friend
   * @param guid - (Optional) If not presents, indicate that client is requesting the friends
   * list of the currently logged in user. If not, a friends list of user with queried GUID
   * will be returned if available.
   */
  deleteFriend(guid: number): Observable<DefaultResponse> {
    return this.deleteFriendResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return info of a group by its guid
   * @param group_guid - Global Unique IDentity
   */
  getGroupResponse(groupGuid: number): Observable<HttpResponse<Group>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (groupGuid != null) __params = __params.set("group_guid", groupGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/groups`,
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
        let _body: Group = null;
        _body = _resp.body as Group
        return _resp.clone({body: _body}) as HttpResponse<Group>;
      })
    );
  }

  /**
   * Return info of a group by its guid
   * @param group_guid - Global Unique IDentity
   */
  getGroup(groupGuid: number): Observable<Group> {
    return this.getGroupResponse(groupGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param owner_guid - Global Unique IDentity
   */
  getGroupsResponse(ownerGuid?: number): Observable<HttpResponse<inline_response_200_2>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (ownerGuid != null) __params = __params.set("owner_guid", ownerGuid.toString());
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/groups`,
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
   * @param owner_guid - Global Unique IDentity
   */
  getGroups(ownerGuid?: number): Observable<inline_response_200_2> {
    return this.getGroupsResponse(ownerGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Insert new group
   * @param body - undefined
   */
  createGroupResponse(body: body_7): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/groups`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Insert new group
   * @param body - undefined
   */
  createGroup(body: body_7): Observable<DefaultResponse> {
    return this.createGroupResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete group
   * @param group_guid - Global Unique IDentity
   */
  deleteGroupResponse(groupGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (groupGuid != null) __params = __params.set("group_guid", groupGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/groups`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Delete group
   * @param group_guid - Global Unique IDentity
   */
  deleteGroup(groupGuid: number): Observable<DefaultResponse> {
    return this.deleteGroupResponse(groupGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Update group
   * @param body - undefined
   */
  updateGroupResponse(body: body_8): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/groups`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Update group
   * @param body - undefined
   */
  updateGroup(body: body_8): Observable<DefaultResponse> {
    return this.updateGroupResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param owner_guid - Global Unique IDentity
   * @param inventory_type - Global Unique IDentity
   */
  getInventoryResponse(params: ApiService.GetInventoryParams): Observable<HttpResponse<Item>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ownerGuid != null) __params = __params.set("owner_guid", params.ownerGuid.toString());
    if (params.inventoryType != null) __params = __params.set("inventory_type", params.inventoryType.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/inventory`,
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
        let _body: Item = null;
        _body = _resp.body as Item
        return _resp.clone({body: _body}) as HttpResponse<Item>;
      })
    );
  }

  /**
   * @param owner_guid - Global Unique IDentity
   * @param inventory_type - Global Unique IDentity
   */
  getInventory(params: ApiService.GetInventoryParams): Observable<Item> {
    return this.getInventoryResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getInventoryByTypeResponse(body: body_9): Observable<HttpResponse<Item[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/inventory`,
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
        let _body: Item[] = null;
        _body = _resp.body as Item[]
        return _resp.clone({body: _body}) as HttpResponse<Item[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getInventoryByType(body: body_9): Observable<Item[]> {
    return this.getInventoryByTypeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return invites list of group
   * @param to_guid - undefined
   * @param invitation_type - undefined
   */
  getInvitationResponse(params: ApiService.GetInvitationParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.toGuid != null) __params = __params.set("to_guid", params.toGuid.toString());
    if (params.invitationType != null) __params = __params.set("invitation_type", params.invitationType.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/invitation`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Return invites list of group
   * @param to_guid - undefined
   * @param invitation_type - undefined
   */
  getInvitation(params: ApiService.GetInvitationParams): Observable<DefaultResponse> {
    return this.getInvitationResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getInvitationsResponse(): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/invitation`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   */
  getInvitations(): Observable<DefaultResponse> {
    return this.getInvitationsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Invite people other join
   * @param body - undefined
   */
  createInvitationResponse(body: body_10): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/invitation`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Invite people other join
   * @param body - undefined
   */
  createInvitation(body: body_10): Observable<DefaultResponse> {
    return this.createInvitationResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Delete invitation
   * @param to_guid - undefined
   * @param invitation_type - undefined
   * @param from_guid - undefined
   */
  deleteInvitationResponse(params: ApiService.DeleteInvitationParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.toGuid != null) __params = __params.set("to_guid", params.toGuid.toString());
    if (params.invitationType != null) __params = __params.set("invitation_type", params.invitationType.toString());
    if (params.fromGuid != null) __params = __params.set("from_guid", params.fromGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/invitation`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * Delete invitation
   * @param to_guid - undefined
   * @param invitation_type - undefined
   * @param from_guid - undefined
   */
  deleteInvitation(params: ApiService.DeleteInvitationParams): Observable<DefaultResponse> {
    return this.deleteInvitationResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return inventory item
   * @param item_guid - undefined
   */
  getInventoryItemResponse(itemGuid: number): Observable<HttpResponse<Item>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (itemGuid != null) __params = __params.set("item_guid", itemGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/item_inventory`,
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
        let _body: Item = null;
        _body = _resp.body as Item
        return _resp.clone({body: _body}) as HttpResponse<Item>;
      })
    );
  }

  /**
   * Return inventory item
   * @param item_guid - undefined
   */
  getInventoryItem(itemGuid: number): Observable<Item> {
    return this.getInventoryItemResponse(itemGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param type - undefined
   * @param post_guid - Global Unique IDentity
   */
  getLikesResponse(params: ApiService.GetLikesParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.type != null) __params = __params.set("type", params.type.toString());
    if (params.postGuid != null) __params = __params.set("post_guid", params.postGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/likes`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param type - undefined
   * @param post_guid - Global Unique IDentity
   */
  getLikes(params: ApiService.GetLikesParams): Observable<DefaultResponse> {
    return this.getLikesResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * type: "post","business:page"
   * @param body - undefined
   */
  createLikeResponse(body: body_11): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/likes`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * type: "post","business:page"
   * @param body - undefined
   */
  createLike(body: body_11): Observable<DefaultResponse> {
    return this.createLikeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * unlike a feed
   * @param guid - Global Unique IDentity
   */
  deleteLikeResponse(guid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (guid != null) __params = __params.set("guid", guid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/likes`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * unlike a feed
   * @param guid - Global Unique IDentity
   */
  deleteLike(guid: number): Observable<DefaultResponse> {
    return this.deleteLikeResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return most sold product
   */
  getProductsMostSoldResponse(): Observable<HttpResponse<Product[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/most_sold_products`,
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
        let _body: Product[] = null;
        _body = _resp.body as Product[]
        return _resp.clone({body: _body}) as HttpResponse<Product[]>;
      })
    );
  }

  /**
   * Return most sold product
   */
  getProductsMostSold(): Observable<Product[]> {
    return this.getProductsMostSoldResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get notification
   * @param guid - Global Unique IDentity
   */
  getNotificationResponse(guid?: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (guid != null) __params = __params.set("guid", guid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/notifications`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * get notification
   * @param guid - Global Unique IDentity
   */
  getNotification(guid?: number): Observable<DefaultResponse> {
    return this.getNotificationResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get all notification
   * @param body - undefined
   */
  getNotificationsResponse(body: body_12): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/notifications`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * get all notification
   * @param body - undefined
   */
  getNotifications(body: body_12): Observable<DefaultResponse> {
    return this.getNotificationsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * update notification
   * @param guid - undefined
   */
  updateNotificationResponse(guid: guid): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = guid;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/notifications`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * update notification
   * @param guid - undefined
   */
  updateNotification(guid: guid): Observable<DefaultResponse> {
    return this.updateNotificationResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param guid - Global Unique IDentity
   */
  getProductResponse(guid: number): Observable<HttpResponse<inline_response_200_3>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (guid != null) __params = __params.set("guid", guid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/products`,
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
        let _body: inline_response_200_3 = null;
        _body = _resp.body as inline_response_200_3
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_3>;
      })
    );
  }

  /**
   * @param guid - Global Unique IDentity
   */
  getProduct(guid: number): Observable<inline_response_200_3> {
    return this.getProductResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getProductsResponse(body: body_14): Observable<HttpResponse<inline_response_200_4>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/products`,
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
        let _body: inline_response_200_4 = null;
        _body = _resp.body as inline_response_200_4
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_4>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getProducts(body: body_14): Observable<inline_response_200_4> {
    return this.getProductsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createProductResponse(body: body_13): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/products`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createProduct(body: body_13): Observable<DefaultResponse> {
    return this.createProductResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param product_guid - Global Unique IDentity
   */
  deleteProductResponse(productGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (productGuid != null) __params = __params.set("product_guid", productGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/products`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param product_guid - Global Unique IDentity
   */
  deleteProduct(productGuid: number): Observable<DefaultResponse> {
    return this.deleteProductResponse(productGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateProductResponse(body: body_15): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/products`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateProduct(body: body_15): Observable<DefaultResponse> {
    return this.updateProductResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get profile page. have only done user profile, not event, group, shop
   * @param username - Global Unique IDentity
   * @param guid - Global Unique IDentity
   */
  getProfileResponse(params: ApiService.GetProfileParams): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.username != null) __params = __params.set("username", params.username.toString());
    if (params.guid != null) __params = __params.set("guid", params.guid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/profile`,
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
        let _body: User = null;
        _body = _resp.body as User
        return _resp.clone({body: _body}) as HttpResponse<User>;
      })
    );
  }

  /**
   * get profile page. have only done user profile, not event, group, shop
   * @param username - Global Unique IDentity
   * @param guid - Global Unique IDentity
   */
  getProfile(params: ApiService.GetProfileParams): Observable<User> {
    return this.getProfileResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * update profile
   * @param body - undefined
   */
  updateProfileResponse(body: body_16): Observable<HttpResponse<inline_response_200_5>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/profile`,
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
        let _body: inline_response_200_5 = null;
        _body = _resp.body as inline_response_200_5
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_5>;
      })
    );
  }

  /**
   * update profile
   * @param body - undefined
   */
  updateProfile(body: body_16): Observable<inline_response_200_5> {
    return this.updateProfileResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param promotion_guid - Global Unique IDentity
   */
  getPromotionResponse(promotionGuid: number): Observable<HttpResponse<inline_response_200_6>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (promotionGuid != null) __params = __params.set("promotion_guid", promotionGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/promotions`,
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
        let _body: inline_response_200_6 = null;
        _body = _resp.body as inline_response_200_6
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_6>;
      })
    );
  }

  /**
   * @param promotion_guid - Global Unique IDentity
   */
  getPromotion(promotionGuid: number): Observable<inline_response_200_6> {
    return this.getPromotionResponse(promotionGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getPromotionsResponse(body: body_18): Observable<HttpResponse<inline_response_200_7>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/promotions`,
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
        let _body: inline_response_200_7 = null;
        _body = _resp.body as inline_response_200_7
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_7>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getPromotions(body: body_18): Observable<inline_response_200_7> {
    return this.getPromotionsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createPromotionResponse(body: body_17): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/promotions`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createPromotion(body: body_17): Observable<DefaultResponse> {
    return this.createPromotionResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param promotion_guid - Global Unique IDentity
   */
  deletePromotionResponse(promotionGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (promotionGuid != null) __params = __params.set("promotion_guid", promotionGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/promotions`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param promotion_guid - Global Unique IDentity
   */
  deletePromotion(promotionGuid: number): Observable<DefaultResponse> {
    return this.deletePromotionResponse(promotionGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updatePromotionResponse(body: body_19): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/promotions`,
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updatePromotion(body: body_19): Observable<DefaultResponse> {
    return this.updatePromotionResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param store_guid - undefined
   * @param shop_guid - undefined
   */
  getShopResponse(params: ApiService.GetShopParams): Observable<HttpResponse<Shop>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.storeGuid != null) __params = __params.set("store_guid", params.storeGuid.toString());
    if (params.shopGuid != null) __params = __params.set("shop_guid", params.shopGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/shops`,
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
        let _body: Shop = null;
        _body = _resp.body as Shop
        return _resp.clone({body: _body}) as HttpResponse<Shop>;
      })
    );
  }

  /**
   * @param store_guid - undefined
   * @param shop_guid - undefined
   */
  getShop(params: ApiService.GetShopParams): Observable<Shop> {
    return this.getShopResponse(params).pipe(
      map(_r => _r.body)
    );
  }}

export module ApiService {
  export interface DeleteAcceptanceParams {
    type: string;
    guid: number;
  }
  export interface DeleteApprovalParams {
    toGuid: string;
    invitationType: string;
    fromGuid: string;
  }
  export interface GetCommentsParams {
    type: string;
    postGuid: number;
    offset: number;
    limit: number;
  }
  export interface GetInventoryParams {
    ownerGuid?: number;
    inventoryType?: string;
  }
  export interface GetInvitationParams {
    toGuid: number;
    invitationType: string;
  }
  export interface DeleteInvitationParams {
    toGuid: number;
    invitationType: string;
    fromGuid: number;
  }
  export interface GetLikesParams {
    type: string;
    postGuid: number;
  }
  export interface GetProfileParams {
    username?: number;
    guid?: number;
  }
  export interface GetShopParams {
    storeGuid: string;
    shopGuid: string;
  }
}
