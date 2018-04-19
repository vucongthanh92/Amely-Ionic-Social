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
import { Advertise } from '../models/advertise';
import { body_2 } from '../models/body-_2';
import { Photo } from '../models/photo';
import { body_3 } from '../models/body-_3';
import { body_4 } from '../models/body-_4';
import { Banner } from '../models/banner';
import { User } from '../models/user';
import { body_5 } from '../models/body-_5';
import { inline_response_200 } from '../models/inline-_response-_200';
import { body_7 } from '../models/body-_7';
import { body_6 } from '../models/body-_6';
import { Business } from '../models/business';
import { inline_response_200_1 } from '../models/inline-_response-_200_1';
import { body_9 } from '../models/body-_9';
import { body_8 } from '../models/body-_8';
import { body_10 } from '../models/body-_10';
import { inline_response_200_2 } from '../models/inline-_response-_200_2';
import { inline_response_200_3 } from '../models/inline-_response-_200_3';
import { body_12 } from '../models/body-_12';
import { body_11 } from '../models/body-_11';
import { body_13 } from '../models/body-_13';
import { Category } from '../models/category';
import { body_15 } from '../models/body-_15';
import { body_14 } from '../models/body-_14';
import { body_16 } from '../models/body-_16';
import { body_17 } from '../models/body-_17';
import { body_18 } from '../models/body-_18';
import { inline_response_200_4 } from '../models/inline-_response-_200_4';
import { body_19 } from '../models/body-_19';
import { body_20 } from '../models/body-_20';
import { CounterOffer } from '../models/counter-offer';
import { body_22 } from '../models/body-_22';
import { body_21 } from '../models/body-_21';
import { Currency } from '../models/currency';
import { Delivery_order } from '../models/delivery-_order';
import { inline_response_200_5 } from '../models/inline-_response-_200_5';
import { body_23 } from '../models/body-_23';
import { inline_response_200_6 } from '../models/inline-_response-_200_6';
import { inline_response_200_7 } from '../models/inline-_response-_200_7';
import { body_25 } from '../models/body-_25';
import { body_24 } from '../models/body-_24';
import { body_26 } from '../models/body-_26';
import { Product } from '../models/product';
import { Shop } from '../models/shop';
import { inline_response_200_8 } from '../models/inline-_response-_200_8';
import { inline_response_200_9 } from '../models/inline-_response-_200_9';
import { body_28 } from '../models/body-_28';
import { body_27 } from '../models/body-_27';
import { body_29 } from '../models/body-_29';
import { Gift } from '../models/gift';
import { body_30 } from '../models/body-_30';
import { Param_create_gift } from '../models/param-_create-_gift';
import { gift_guid } from '../models/gift-_guid';
import { body_31 } from '../models/body-_31';
import { body_32 } from '../models/body-_32';
import { Group } from '../models/group';
import { inline_response_200_11 } from '../models/inline-_response-_200_11';
import { inline_response_200_10 } from '../models/inline-_response-_200_10';
import { body_33 } from '../models/body-_33';
import { body_34 } from '../models/body-_34';
import { Item } from '../models/item';
import { body_35 } from '../models/body-_35';
import { inline_response_200_12 } from '../models/inline-_response-_200_12';
import { body_36 } from '../models/body-_36';
import { body_37 } from '../models/body-_37';
import { body_38 } from '../models/body-_38';
import { body_39 } from '../models/body-_39';
import { Manufacturer } from '../models/manufacturer';
import { body_40 } from '../models/body-_40';
import { Mood } from '../models/mood';
import { Notification } from '../models/notification';
import { body_41 } from '../models/body-_41';
import { guid } from '../models/guid';
import { Offer } from '../models/offer';
import { body_42 } from '../models/body-_42';
import { inline_response_200_13 } from '../models/inline-_response-_200_13';
import { Param_create_offer } from '../models/param-_create-_offer';
import { body_43 } from '../models/body-_43';
import { Order_redeem } from '../models/order-_redeem';
import { body_44 } from '../models/body-_44';
import { Order } from '../models/order';
import { inline_response_200_15 } from '../models/inline-_response-_200_15';
import { inline_response_200_14 } from '../models/inline-_response-_200_14';
import { Param_create_order } from '../models/param-_create-_order';
import { body_45 } from '../models/body-_45';
import { ProductGroup } from '../models/product-group';
import { inline_response_200_16 } from '../models/inline-_response-_200_16';
import { inline_response_200_17 } from '../models/inline-_response-_200_17';
import { body_47 } from '../models/body-_47';
import { body_46 } from '../models/body-_46';
import { body_48 } from '../models/body-_48';
import { body_49 } from '../models/body-_49';
import { inline_response_200_18 } from '../models/inline-_response-_200_18';
import { inline_response_200_19 } from '../models/inline-_response-_200_19';
import { body_51 } from '../models/body-_51';
import { body_50 } from '../models/body-_50';
import { body_52 } from '../models/body-_52';
import { QRCode } from '../models/qrcode';
import { body_53 } from '../models/body-_53';
import { body_54 } from '../models/body-_54';
import { body_55 } from '../models/body-_55';
import { body_56 } from '../models/body-_56';
import { inline_response_200_20 } from '../models/inline-_response-_200_20';
import { search_responses } from '../models/search-_responses';
import { body_57 } from '../models/body-_57';
import { Services } from '../models/services';
import { body_58 } from '../models/body-_58';
import { inline_response_200_21 } from '../models/inline-_response-_200_21';
import { ShopOrder } from '../models/shop-order';
import { body_59 } from '../models/body-_59';
import { body_60 } from '../models/body-_60';
import { body_61 } from '../models/body-_61';
import { inline_response_200_22 } from '../models/inline-_response-_200_22';
import { ShopShipping } from '../models/shop-shipping';
import { body_62 } from '../models/body-_62';
import { inline_response_200_23 } from '../models/inline-_response-_200_23';
import { body_63 } from '../models/body-_63';
import { Temp_order } from '../models/temp-_order';
import { Param_create_TempOrder } from '../models/param-_create-_temp-order';
import { Transaction } from '../models/transaction';
import { body_64 } from '../models/body-_64';
import { body_65 } from '../models/body-_65';
import { body_66 } from '../models/body-_66';
import { Wallet } from '../models/wallet';
import { inline_response_200_24 } from '../models/inline-_response-_200_24';
import { body_68 } from '../models/body-_68';
import { body_67 } from '../models/body-_67';
import { body_69 } from '../models/body-_69';


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
   * @param body - undefined
   */
  activeUserResponse(body: body): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/activation`,
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
  activeUser(body: body): Observable<DefaultResponse> {
    return this.activeUserResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  changeAdminResponse(body: body_1): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/admin_change_requests`,
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
  changeAdmin(body: body_1): Observable<DefaultResponse> {
    return this.changeAdminResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param poll_guid - undefined
   */
  deletePollCandidateResponse(pollGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (pollGuid != null) __params = __params.set("poll_guid", pollGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/admin_change_requests`,
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
   * @param poll_guid - undefined
   */
  deletePollCandidate(pollGuid: number): Observable<DefaultResponse> {
    return this.deletePollCandidateResponse(pollGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getAdvertisesResponse(body: body_2): Observable<HttpResponse<Advertise>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/advertise`,
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
        let _body: Advertise = null;
        _body = _resp.body as Advertise
        return _resp.clone({body: _body}) as HttpResponse<Advertise>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getAdvertises(body: body_2): Observable<Advertise> {
    return this.getAdvertisesResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getAlbumsResponse(): Observable<HttpResponse<Photo[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/album`,
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
        let _body: Photo[] = null;
        _body = _resp.body as Photo[]
        return _resp.clone({body: _body}) as HttpResponse<Photo[]>;
      })
    );
  }

  /**
   */
  getAlbums(): Observable<Photo[]> {
    return this.getAlbumsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Approve invitation request
   * @param body - undefined
   */
  createApprovalResponse(body: body_3): Observable<HttpResponse<DefaultResponse>> {
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
  createApproval(body: body_3): Observable<DefaultResponse> {
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
  loginResponse(body: body_4): Observable<HttpResponse<DefaultResponse>> {
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
  login(body: body_4): Observable<DefaultResponse> {
    return this.loginResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getBannersResponse(): Observable<HttpResponse<Banner[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/banner`,
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
        let _body: Banner[] = null;
        _body = _resp.body as Banner[]
        return _resp.clone({body: _body}) as HttpResponse<Banner[]>;
      })
    );
  }

  /**
   */
  getBanners(): Observable<Banner[]> {
    return this.getBannersResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getBlocksResponse(): Observable<HttpResponse<User[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/block`,
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
   */
  getBlocks(): Observable<User[]> {
    return this.getBlocksResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createBlockResponse(body: body_5): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/block`,
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
  createBlock(body: body_5): Observable<DefaultResponse> {
    return this.createBlockResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param user_guid - undefined
   */
  deleteBlockResponse(userGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (userGuid != null) __params = __params.set("user_guid", userGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/block`,
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
   * @param user_guid - undefined
   */
  deleteBlock(userGuid: number): Observable<DefaultResponse> {
    return this.deleteBlockResponse(userGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getBookmarksResponse(body: body_7): Observable<HttpResponse<inline_response_200>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/bookmark`,
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
  getBookmarks(body: body_7): Observable<inline_response_200> {
    return this.getBookmarksResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createBookmarkResponse(body: body_6): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/bookmark`,
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
  createBookmark(body: body_6): Observable<DefaultResponse> {
    return this.createBookmarkResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param bookmark_type - undefined
   */
  deleteBookmarkResponse(bookmarkType: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (bookmarkType != null) __params = __params.set("bookmark_type", bookmarkType.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/bookmark`,
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
   * @param bookmark_type - undefined
   */
  deleteBookmark(bookmarkType: string): Observable<DefaultResponse> {
    return this.deleteBookmarkResponse(bookmarkType).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param business_guid - undefined
   */
  getBusinessPageResponse(businessGuid: number): Observable<HttpResponse<Business>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (businessGuid != null) __params = __params.set("business_guid", businessGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/business`,
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
        let _body: Business = null;
        _body = _resp.body as Business
        return _resp.clone({body: _body}) as HttpResponse<Business>;
      })
    );
  }

  /**
   * @param business_guid - undefined
   */
  getBusinessPage(businessGuid: number): Observable<Business> {
    return this.getBusinessPageResponse(businessGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getBusinessPagesResponse(body: body_9): Observable<HttpResponse<inline_response_200_1>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/business`,
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
   * @param body - undefined
   */
  getBusinessPages(body: body_9): Observable<inline_response_200_1> {
    return this.getBusinessPagesResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createBusinessPageResponse(body: body_8): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/business`,
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
  createBusinessPage(body: body_8): Observable<DefaultResponse> {
    return this.createBusinessPageResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param business_guid - undefined
   */
  deleteBusinessPageResponse(businessGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (businessGuid != null) __params = __params.set("business_guid", businessGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/business`,
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
   * @param business_guid - undefined
   */
  deleteBusinessPage(businessGuid: number): Observable<DefaultResponse> {
    return this.deleteBusinessPageResponse(businessGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateBusinessPageResponse(body: body_10): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/business`,
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
  updateBusinessPage(body: body_10): Observable<DefaultResponse> {
    return this.updateBusinessPageResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Get the user cart
   */
  getCartResponse(): Observable<HttpResponse<inline_response_200_2>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/cart`,
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
   * Get the user cart
   */
  getCart(): Observable<inline_response_200_2> {
    return this.getCartResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * example request:
   *   {
   *     "items":[
   *  {"guid":380,"quantity":5},
   *  {"guid":382,"quantity":5}
   *  ]
   * }
   * @param body - undefined
   */
  getCartsResponse(body: body_12): Observable<HttpResponse<inline_response_200_3>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/cart`,
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
   * example request:
   *   {
   *     "items":[
   *  {"guid":380,"quantity":5},
   *  {"guid":382,"quantity":5}
   *  ]
   * }
   * @param body - undefined
   */
  getCarts(body: body_12): Observable<inline_response_200_3> {
    return this.getCartsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Put new products into the user's cart
   * @param body - undefined
   */
  createCartResponse(body: body_11): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/cart`,
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
   * Put new products into the user's cart
   * @param body - undefined
   */
  createCart(body: body_11): Observable<DefaultResponse> {
    return this.createCartResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param guid - Global Unique IDentity
   */
  deleteCartResponse(guid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (guid != null) __params = __params.set("guid", guid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/cart`,
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
   * @param guid - Global Unique IDentity
   */
  deleteCart(guid: number): Observable<DefaultResponse> {
    return this.deleteCartResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Update the user's cart's items
   * @param body - undefined
   */
  updateCartResponse(body: body_13): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/cart`,
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
   * Update the user's cart's items
   * @param body - undefined
   */
  updateCart(body: body_13): Observable<DefaultResponse> {
    return this.updateCartResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param category_guid - Global Unique IDentity
   */
  getCategoryResponse(categoryGuid: number): Observable<HttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (categoryGuid != null) __params = __params.set("category_guid", categoryGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
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
        let _body: Category = null;
        _body = _resp.body as Category
        return _resp.clone({body: _body}) as HttpResponse<Category>;
      })
    );
  }

  /**
   * @param category_guid - Global Unique IDentity
   */
  getCategory(categoryGuid: number): Observable<Category> {
    return this.getCategoryResponse(categoryGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get all categories
   * @param body - undefined
   */
  getCategoriesResponse(body: body_15): Observable<HttpResponse<Category[]>> {
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
  getCategories(body: body_15): Observable<Category[]> {
    return this.getCategoriesResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createCategoryResponse(body: body_14): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createCategory(body: body_14): Observable<DefaultResponse> {
    return this.createCategoryResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * delete a category
   * @param category_guid - Global Unique IDentity
   */
  deleteCategoryResponse(categoryGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (categoryGuid != null) __params = __params.set("category_guid", categoryGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * delete a category
   * @param category_guid - Global Unique IDentity
   */
  deleteCategory(categoryGuid: number): Observable<DefaultResponse> {
    return this.deleteCategoryResponse(categoryGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateCategoryResponse(body: body_16): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateCategory(body: body_16): Observable<DefaultResponse> {
    return this.updateCategoryResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  change_passwordResponse(body: body_17): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/change_password`,
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
  change_password(body: body_17): Observable<DefaultResponse> {
    return this.change_passwordResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  change_phoneResponse(body: body_18): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/change_phone`,
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
  change_phone(body: body_18): Observable<DefaultResponse> {
    return this.change_phoneResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param advertise_guid - undefined
   */
  clickAdsResponse(advertiseGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (advertiseGuid != null) __params = __params.set("advertise_guid", advertiseGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/click_ads`,
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
   * @param advertise_guid - undefined
   */
  clickAds(advertiseGuid: number): Observable<DefaultResponse> {
    return this.clickAdsResponse(advertiseGuid).pipe(
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
  getCommentsResponse(params: ApiService.GetCommentsParams): Observable<HttpResponse<inline_response_200_4>> {
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
        let _body: inline_response_200_4 = null;
        _body = _resp.body as inline_response_200_4
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_4>;
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
  getComments(params: ApiService.GetCommentsParams): Observable<inline_response_200_4> {
    return this.getCommentsResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * insert a new comment
   * @param body - undefined
   */
  createCommentResponse(body: body_19): Observable<HttpResponse<DefaultResponse>> {
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
  createComment(body: body_19): Observable<DefaultResponse> {
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
   * @param body - undefined
   */
  contact_updateResponse(body: body_20): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/contact_update`,
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
  contact_update(body: body_20): Observable<DefaultResponse> {
    return this.contact_updateResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param counter_offer_guid - undefined
   */
  getCounterOfferResponse(counterOfferGuid: number): Observable<HttpResponse<CounterOffer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (counterOfferGuid != null) __params = __params.set("counter_offer_guid", counterOfferGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/counter_offers`,
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
        let _body: CounterOffer = null;
        _body = _resp.body as CounterOffer
        return _resp.clone({body: _body}) as HttpResponse<CounterOffer>;
      })
    );
  }

  /**
   * @param counter_offer_guid - undefined
   */
  getCounterOffer(counterOfferGuid: number): Observable<CounterOffer> {
    return this.getCounterOfferResponse(counterOfferGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getCounterOffersResponse(body: body_22): Observable<HttpResponse<CounterOffer[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/counter_offers`,
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
        let _body: CounterOffer[] = null;
        _body = _resp.body as CounterOffer[]
        return _resp.clone({body: _body}) as HttpResponse<CounterOffer[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getCounterOffers(body: body_22): Observable<CounterOffer[]> {
    return this.getCounterOffersResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createCounterOfferResponse(body: body_21): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/counter_offers`,
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
  createCounterOffer(body: body_21): Observable<DefaultResponse> {
    return this.createCounterOfferResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param counter_offer_guid - Global Unique IDentity
   */
  deleteCounterOfferResponse(counterOfferGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (counterOfferGuid != null) __params = __params.set("counter_offer_guid", counterOfferGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/counter_offers`,
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
   * @param counter_offer_guid - Global Unique IDentity
   */
  deleteCounterOffer(counterOfferGuid: number): Observable<DefaultResponse> {
    return this.deleteCounterOfferResponse(counterOfferGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param iso_code - undefined
   */
  getCurrencyResponse(isoCode?: string): Observable<HttpResponse<Currency>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (isoCode != null) __params = __params.set("iso_code", isoCode.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/currencies`,
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
        let _body: Currency = null;
        _body = _resp.body as Currency
        return _resp.clone({body: _body}) as HttpResponse<Currency>;
      })
    );
  }

  /**
   * @param iso_code - undefined
   */
  getCurrency(isoCode?: string): Observable<Currency> {
    return this.getCurrencyResponse(isoCode).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getCurrenciesResponse(): Observable<HttpResponse<Currency[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/currencies`,
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
        let _body: Currency[] = null;
        _body = _resp.body as Currency[]
        return _resp.clone({body: _body}) as HttpResponse<Currency[]>;
      })
    );
  }

  /**
   */
  getCurrencies(): Observable<Currency[]> {
    return this.getCurrenciesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param entity_guid - Global Unique IDentity
   */
  deleteImageProductResponse(entityGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (entityGuid != null) __params = __params.set("entity_guid", entityGuid.toString());
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
   * @param entity_guid - Global Unique IDentity
   */
  deleteImageProduct(entityGuid: number): Observable<DefaultResponse> {
    return this.deleteImageProductResponse(entityGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param do_guid - Global Unique IDentity
   */
  getDOResponse(doGuid: number): Observable<HttpResponse<Delivery_order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (doGuid != null) __params = __params.set("do_guid", doGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/delivery_orders`,
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
        let _body: Delivery_order = null;
        _body = _resp.body as Delivery_order
        return _resp.clone({body: _body}) as HttpResponse<Delivery_order>;
      })
    );
  }

  /**
   * @param do_guid - Global Unique IDentity
   */
  getDO(doGuid: number): Observable<Delivery_order> {
    return this.getDOResponse(doGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getDOsResponse(): Observable<HttpResponse<inline_response_200_5>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/delivery_orders`,
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
   */
  getDOs(): Observable<inline_response_200_5> {
    return this.getDOsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createDOResponse(body: body_23): Observable<HttpResponse<Delivery_order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/delivery_orders`,
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
        let _body: Delivery_order = null;
        _body = _resp.body as Delivery_order
        return _resp.clone({body: _body}) as HttpResponse<Delivery_order>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createDO(body: body_23): Observable<Delivery_order> {
    return this.createDOResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param event_guid - Global Unique IDentity
   */
  getEventResponse(eventGuid: number): Observable<HttpResponse<inline_response_200_6>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (eventGuid != null) __params = __params.set("event_guid", eventGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/events`,
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
   * @param event_guid - Global Unique IDentity
   */
  getEvent(eventGuid: number): Observable<inline_response_200_6> {
    return this.getEventResponse(eventGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getEventsResponse(body?: body_25): Observable<HttpResponse<inline_response_200_7>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/events`,
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
  getEvents(body?: body_25): Observable<inline_response_200_7> {
    return this.getEventsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createEventResponse(body: body_24): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/events`,
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
  createEvent(body: body_24): Observable<DefaultResponse> {
    return this.createEventResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param event_guid - undefined
   */
  deleteEventResponse(eventGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (eventGuid != null) __params = __params.set("event_guid", eventGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/events`,
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
   * @param event_guid - undefined
   */
  deleteEvent(eventGuid: number): Observable<DefaultResponse> {
    return this.deleteEventResponse(eventGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateEventResponse(body: body_26): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/events`,
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
  updateEvent(body: body_26): Observable<DefaultResponse> {
    return this.updateEventResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getFeaturedProductsResponse(): Observable<HttpResponse<Product[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/featured_products`,
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
   */
  getFeaturedProducts(): Observable<Product[]> {
    return this.getFeaturedProductsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getFeaturedShopsResponse(): Observable<HttpResponse<Shop[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/featured_shops`,
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
        let _body: Shop[] = null;
        _body = _resp.body as Shop[]
        return _resp.clone({body: _body}) as HttpResponse<Shop[]>;
      })
    );
  }

  /**
   */
  getFeaturedShops(): Observable<Shop[]> {
    return this.getFeaturedShopsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get the feeds of the requested GUID (currently logged in user if not
   * specified)
   * @param post_guid - Global Unique IDentity
   */
  getFeedResponse(postGuid: number): Observable<HttpResponse<inline_response_200_8>> {
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
        let _body: inline_response_200_8 = null;
        _body = _resp.body as inline_response_200_8
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_8>;
      })
    );
  }

  /**
   * get the feeds of the requested GUID (currently logged in user if not
   * specified)
   * @param post_guid - Global Unique IDentity
   */
  getFeed(postGuid: number): Observable<inline_response_200_8> {
    return this.getFeedResponse(postGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * owner_guid: wall
   * empty owner_guid: timeline of user
   * @param body - undefined
   */
  getFeedsResponse(body: body_28): Observable<HttpResponse<inline_response_200_9>> {
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
        let _body: inline_response_200_9 = null;
        _body = _resp.body as inline_response_200_9
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_9>;
      })
    );
  }

  /**
   * owner_guid: wall
   * empty owner_guid: timeline of user
   * @param body - undefined
   */
  getFeeds(body: body_28): Observable<inline_response_200_9> {
    return this.getFeedsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Post a new feed (Can't upload image)
   * @param body - undefined
   */
  createFeedResponse(body: body_27): Observable<HttpResponse<DefaultResponse>> {
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
  createFeed(body: body_27): Observable<DefaultResponse> {
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
  updateFeedResponse(body: body_29): Observable<HttpResponse<DefaultResponse>> {
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
  updateFeed(body: body_29): Observable<DefaultResponse> {
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
   * @param gift_guid - undefined
   */
  getGiftResponse(giftGuid: string): Observable<HttpResponse<Gift>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (giftGuid != null) __params = __params.set("gift_guid", giftGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/gift`,
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
        let _body: Gift = null;
        _body = _resp.body as Gift
        return _resp.clone({body: _body}) as HttpResponse<Gift>;
      })
    );
  }

  /**
   * @param gift_guid - undefined
   */
  getGift(giftGuid: string): Observable<Gift> {
    return this.getGiftResponse(giftGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getGiftsResponse(body: body_30): Observable<HttpResponse<Gift[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/gift`,
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
        let _body: Gift[] = null;
        _body = _resp.body as Gift[]
        return _resp.clone({body: _body}) as HttpResponse<Gift[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getGifts(body: body_30): Observable<Gift[]> {
    return this.getGiftsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createGiftResponse(body: Param_create_gift): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/gift`,
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
  createGift(body: Param_create_gift): Observable<DefaultResponse> {
    return this.createGiftResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param gift_guid - undefined
   */
  rejectGiftResponse(giftGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (giftGuid != null) __params = __params.set("gift_guid", giftGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/gift`,
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
   * @param gift_guid - undefined
   */
  rejectGift(giftGuid: number): Observable<DefaultResponse> {
    return this.rejectGiftResponse(giftGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param gift_guid - undefined
   */
  acceptGiftResponse(giftGuid: gift_guid): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = giftGuid;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/gift`,
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
   * @param gift_guid - undefined
   */
  acceptGift(giftGuid: gift_guid): Observable<DefaultResponse> {
    return this.acceptGiftResponse(giftGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createGiveListResponse(body: body_31): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/givelist`,
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
  createGiveList(body: body_31): Observable<DefaultResponse> {
    return this.createGiveListResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param item_guid - undefined
   */
  deleteGiveListResponse(itemGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (itemGuid != null) __params = __params.set("item_guid", itemGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/givelist`,
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
   * @param item_guid - undefined
   */
  deleteGiveList(itemGuid: number): Observable<DefaultResponse> {
    return this.deleteGiveListResponse(itemGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  voteGroupResponse(body: body_32): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/group_vote`,
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
  voteGroup(body: body_32): Observable<DefaultResponse> {
    return this.voteGroupResponse(body).pipe(
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
  getGroupsResponse(ownerGuid?: number): Observable<HttpResponse<inline_response_200_11>> {
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
        let _body: inline_response_200_11 = null;
        _body = _resp.body as inline_response_200_11
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_11>;
      })
    );
  }

  /**
   * @param owner_guid - Global Unique IDentity
   */
  getGroups(ownerGuid?: number): Observable<inline_response_200_11> {
    return this.getGroupsResponse(ownerGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Insert new group
   * @param body - undefined
   */
  createGroupResponse(body: body_33): Observable<HttpResponse<inline_response_200_10>> {
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
        let _body: inline_response_200_10 = null;
        _body = _resp.body as inline_response_200_10
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_10>;
      })
    );
  }

  /**
   * Insert new group
   * @param body - undefined
   */
  createGroup(body: body_33): Observable<inline_response_200_10> {
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
  updateGroupResponse(body: body_34): Observable<HttpResponse<DefaultResponse>> {
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
  updateGroup(body: body_34): Observable<DefaultResponse> {
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
  getInventoryByTypeResponse(body: body_35): Observable<HttpResponse<Item[]>> {
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
  getInventoryByType(body: body_35): Observable<Item[]> {
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
  getInvitationsResponse(): Observable<HttpResponse<inline_response_200_12>> {
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
        let _body: inline_response_200_12 = null;
        _body = _resp.body as inline_response_200_12
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_12>;
      })
    );
  }

  /**
   */
  getInvitations(): Observable<inline_response_200_12> {
    return this.getInvitationsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Invite people other join
   * @param body - undefined
   */
  createInvitationResponse(body: body_36): Observable<HttpResponse<DefaultResponse>> {
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
  createInvitation(body: body_36): Observable<DefaultResponse> {
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
   * @param body - undefined
   */
  extendDaysResponse(body: body_37): Observable<HttpResponse<Item>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
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
   * @param body - undefined
   */
  extendDays(body: body_37): Observable<Item> {
    return this.extendDaysResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  joinResponse(body: body_38): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/join`,
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
  join(body: body_38): Observable<DefaultResponse> {
    return this.joinResponse(body).pipe(
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
  createLikeResponse(body: body_39): Observable<HttpResponse<DefaultResponse>> {
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
  createLike(body: body_39): Observable<DefaultResponse> {
    return this.createLikeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * unlike a feed
   * @param type - undefined
   * @param guid - Global Unique IDentity
   */
  deleteLikeResponse(params: ApiService.DeleteLikeParams): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.type != null) __params = __params.set("type", params.type.toString());
    if (params.guid != null) __params = __params.set("guid", params.guid.toString());
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
   * @param type - undefined
   * @param guid - Global Unique IDentity
   */
  deleteLike(params: ApiService.DeleteLikeParams): Observable<DefaultResponse> {
    return this.deleteLikeResponse(params).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param manufacturer_guid - Global Unique IDentity
   */
  getManufacturerResponse(manufacturerGuid: number): Observable<HttpResponse<Manufacturer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (manufacturerGuid != null) __params = __params.set("manufacturer_guid", manufacturerGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/manufacturer`,
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
        let _body: Manufacturer = null;
        _body = _resp.body as Manufacturer
        return _resp.clone({body: _body}) as HttpResponse<Manufacturer>;
      })
    );
  }

  /**
   * @param manufacturer_guid - Global Unique IDentity
   */
  getManufacturer(manufacturerGuid: number): Observable<Manufacturer> {
    return this.getManufacturerResponse(manufacturerGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getManufacturersResponse(body: {}): Observable<HttpResponse<Manufacturer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/manufacturer`,
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
        let _body: Manufacturer = null;
        _body = _resp.body as Manufacturer
        return _resp.clone({body: _body}) as HttpResponse<Manufacturer>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getManufacturers(body: {}): Observable<Manufacturer> {
    return this.getManufacturersResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getMembersResponse(body: body_40): Observable<HttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/members`,
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
   * @param body - undefined
   */
  getMembers(body: body_40): Observable<User> {
    return this.getMembersResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param mood_guid - undefined
   */
  getMoodResponse(moodGuid: number): Observable<HttpResponse<Mood>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (moodGuid != null) __params = __params.set("mood_guid", moodGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/mood`,
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
        let _body: Mood = null;
        _body = _resp.body as Mood
        return _resp.clone({body: _body}) as HttpResponse<Mood>;
      })
    );
  }

  /**
   * @param mood_guid - undefined
   */
  getMood(moodGuid: number): Observable<Mood> {
    return this.getMoodResponse(moodGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getMoodsResponse(): Observable<HttpResponse<Mood>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/mood`,
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
        let _body: Mood = null;
        _body = _resp.body as Mood
        return _resp.clone({body: _body}) as HttpResponse<Mood>;
      })
    );
  }

  /**
   */
  getMoods(): Observable<Mood> {
    return this.getMoodsResponse().pipe(
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
  getNotificationResponse(guid?: number): Observable<HttpResponse<Notification>> {
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
        let _body: Notification = null;
        _body = _resp.body as Notification
        return _resp.clone({body: _body}) as HttpResponse<Notification>;
      })
    );
  }

  /**
   * get notification
   * @param guid - Global Unique IDentity
   */
  getNotification(guid?: number): Observable<Notification> {
    return this.getNotificationResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get all notification
   * @param body - undefined
   */
  getNotificationsResponse(body: body_41): Observable<HttpResponse<DefaultResponse>> {
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
  getNotifications(body: body_41): Observable<DefaultResponse> {
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
   * @param offer_guid - undefined
   */
  getOfferResponse(offerGuid: number): Observable<HttpResponse<Offer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (offerGuid != null) __params = __params.set("offer_guid", offerGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/offers`,
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
        let _body: Offer = null;
        _body = _resp.body as Offer
        return _resp.clone({body: _body}) as HttpResponse<Offer>;
      })
    );
  }

  /**
   * @param offer_guid - undefined
   */
  getOffer(offerGuid: number): Observable<Offer> {
    return this.getOfferResponse(offerGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getOffersResponse(body: body_42): Observable<HttpResponse<Offer[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/offers`,
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
        let _body: Offer[] = null;
        _body = _resp.body as Offer[]
        return _resp.clone({body: _body}) as HttpResponse<Offer[]>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getOffers(body: body_42): Observable<Offer[]> {
    return this.getOffersResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createOfferResponse(body: Param_create_offer): Observable<HttpResponse<inline_response_200_13>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/offers`,
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
        let _body: inline_response_200_13 = null;
        _body = _resp.body as inline_response_200_13
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_13>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createOffer(body: Param_create_offer): Observable<inline_response_200_13> {
    return this.createOfferResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param offer_guid - Global Unique IDentity
   */
  deleteOfferResponse(offerGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (offerGuid != null) __params = __params.set("offer_guid", offerGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/offers`,
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
   * @param offer_guid - Global Unique IDentity
   */
  deleteOffer(offerGuid: number): Observable<DefaultResponse> {
    return this.deleteOfferResponse(offerGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateOfferResponse(body: body_43): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/offers`,
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
  updateOffer(body: body_43): Observable<DefaultResponse> {
    return this.updateOfferResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  orderRedeemResponse(body: body_44): Observable<HttpResponse<Order_redeem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/order_redeem`,
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
        let _body: Order_redeem = null;
        _body = _resp.body as Order_redeem
        return _resp.clone({body: _body}) as HttpResponse<Order_redeem>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  orderRedeem(body: body_44): Observable<Order_redeem> {
    return this.orderRedeemResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param order_guid - Global Unique IDentity
   */
  getOrderResponse(orderGuid: number): Observable<HttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (orderGuid != null) __params = __params.set("order_guid", orderGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/orders`,
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
        let _body: Order = null;
        _body = _resp.body as Order
        return _resp.clone({body: _body}) as HttpResponse<Order>;
      })
    );
  }

  /**
   * @param order_guid - Global Unique IDentity
   */
  getOrder(orderGuid: number): Observable<Order> {
    return this.getOrderResponse(orderGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getOrdersResponse(): Observable<HttpResponse<inline_response_200_15>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/orders`,
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
        let _body: inline_response_200_15 = null;
        _body = _resp.body as inline_response_200_15
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_15>;
      })
    );
  }

  /**
   */
  getOrders(): Observable<inline_response_200_15> {
    return this.getOrdersResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * "fullname": "admin",
   * "phone": "01649692858",
   * "address": "49/2/2M",
   * "province": "04",
   * "district": "003",
   * "ward": "00004",
   * "note": "test",
   * "payment": "ngl/creditcard",
   * "bankcode": "VISA",
   * "total": "898",
   * "shipping_fullname": "admin",
   * "shipping_phone": "01649692858",
   * "shipping_address": "49/2/2M",
   * "shipping_province": "04",
   * "shipping_district": "003",
   * "shipping_ward": "00004",
   * "shipping_note": "thich gi cung dc",
   * "shipping_method": "sq/storage",
   * "shipping_fee": "0"
   * "to_guid": "13254"
   * @param body - undefined
   */
  createOrderResponse(body: Param_create_order): Observable<HttpResponse<inline_response_200_14>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/orders`,
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
        let _body: inline_response_200_14 = null;
        _body = _resp.body as inline_response_200_14
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_14>;
      })
    );
  }

  /**
   * "fullname": "admin",
   * "phone": "01649692858",
   * "address": "49/2/2M",
   * "province": "04",
   * "district": "003",
   * "ward": "00004",
   * "note": "test",
   * "payment": "ngl/creditcard",
   * "bankcode": "VISA",
   * "total": "898",
   * "shipping_fullname": "admin",
   * "shipping_phone": "01649692858",
   * "shipping_address": "49/2/2M",
   * "shipping_province": "04",
   * "shipping_district": "003",
   * "shipping_ward": "00004",
   * "shipping_note": "thich gi cung dc",
   * "shipping_method": "sq/storage",
   * "shipping_fee": "0"
   * "to_guid": "13254"
   * @param body - undefined
   */
  createOrder(body: Param_create_order): Observable<inline_response_200_14> {
    return this.createOrderResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Update a order
   * @param body - undefined
   */
  updateOrderResponse(body: body_45): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/orders`,
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
   * Update a order
   * @param body - undefined
   */
  updateOrder(body: body_45): Observable<DefaultResponse> {
    return this.updateOrderResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get all category
   */
  getProductCategoryResponse(): Observable<HttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/product_categories`,
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
        let _body: Category = null;
        _body = _resp.body as Category
        return _resp.clone({body: _body}) as HttpResponse<Category>;
      })
    );
  }

  /**
   * get all category
   */
  getProductCategory(): Observable<Category> {
    return this.getProductCategoryResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getProductGroupsResponse(): Observable<HttpResponse<ProductGroup[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/product_group`,
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
        let _body: ProductGroup[] = null;
        _body = _resp.body as ProductGroup[]
        return _resp.clone({body: _body}) as HttpResponse<ProductGroup[]>;
      })
    );
  }

  /**
   */
  getProductGroups(): Observable<ProductGroup[]> {
    return this.getProductGroupsResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param guid - Global Unique IDentity
   */
  getProductResponse(guid: number): Observable<HttpResponse<inline_response_200_16>> {
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
        let _body: inline_response_200_16 = null;
        _body = _resp.body as inline_response_200_16
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_16>;
      })
    );
  }

  /**
   * @param guid - Global Unique IDentity
   */
  getProduct(guid: number): Observable<inline_response_200_16> {
    return this.getProductResponse(guid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getProductsResponse(body: body_47): Observable<HttpResponse<inline_response_200_17>> {
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
        let _body: inline_response_200_17 = null;
        _body = _resp.body as inline_response_200_17
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_17>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getProducts(body: body_47): Observable<inline_response_200_17> {
    return this.getProductsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createProductResponse(body: body_46): Observable<HttpResponse<DefaultResponse>> {
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
  createProduct(body: body_46): Observable<DefaultResponse> {
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
  updateProductResponse(body: body_48): Observable<HttpResponse<DefaultResponse>> {
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
  updateProduct(body: body_48): Observable<DefaultResponse> {
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
  updateProfileResponse(body: body_49): Observable<HttpResponse<DefaultResponse>> {
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * update profile
   * @param body - undefined
   */
  updateProfile(body: body_49): Observable<DefaultResponse> {
    return this.updateProfileResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param promotion_guid - Global Unique IDentity
   */
  getPromotionResponse(promotionGuid: number): Observable<HttpResponse<inline_response_200_18>> {
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
        let _body: inline_response_200_18 = null;
        _body = _resp.body as inline_response_200_18
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_18>;
      })
    );
  }

  /**
   * @param promotion_guid - Global Unique IDentity
   */
  getPromotion(promotionGuid: number): Observable<inline_response_200_18> {
    return this.getPromotionResponse(promotionGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getPromotionsResponse(body: body_51): Observable<HttpResponse<inline_response_200_19>> {
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
        let _body: inline_response_200_19 = null;
        _body = _resp.body as inline_response_200_19
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_19>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  getPromotions(body: body_51): Observable<inline_response_200_19> {
    return this.getPromotionsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createPromotionResponse(body: body_50): Observable<HttpResponse<DefaultResponse>> {
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
  createPromotion(body: body_50): Observable<DefaultResponse> {
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
  updatePromotionResponse(body: body_52): Observable<HttpResponse<DefaultResponse>> {
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
  updatePromotion(body: body_52): Observable<DefaultResponse> {
    return this.updatePromotionResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * null
   * @param body - undefined
   */
  quickPayCreateResponse(body: Param_create_order): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/quickpay`,
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
   * null
   * @param body - undefined
   */
  quickPayCreate(body: Param_create_order): Observable<DefaultResponse> {
    return this.quickPayCreateResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param redeem_code - undefined
   */
  getRedeemResponse(redeemCode: string): Observable<HttpResponse<Item>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (redeemCode != null) __params = __params.set("redeem_code", redeemCode.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/redeem`,
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
   * @param redeem_code - undefined
   */
  getRedeem(redeemCode: string): Observable<Item> {
    return this.getRedeemResponse(redeemCode).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param redeem_code - undefined
   */
  postRedeemResponse(redeemCode: string): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (redeemCode != null) __params = __params.set("redeem_code", redeemCode.toString());
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/redeem`,
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
   * @param redeem_code - undefined
   */
  postRedeem(redeemCode: string): Observable<DefaultResponse> {
    return this.postRedeemResponse(redeemCode).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createRedeemResponse(body: body_53): Observable<HttpResponse<QRCode>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/redeem`,
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
        let _body: QRCode = null;
        _body = _resp.body as QRCode
        return _resp.clone({body: _body}) as HttpResponse<QRCode>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  createRedeem(body: body_53): Observable<QRCode> {
    return this.createRedeemResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  registerResponse(body: body_54): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/register`,
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
  register(body: body_54): Observable<DefaultResponse> {
    return this.registerResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  removalResponse(body: body_55): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/removal`,
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
  removal(body: body_55): Observable<DefaultResponse> {
    return this.removalResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  reportResponse(body: body_56): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/report`,
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
  report(body: body_56): Observable<DefaultResponse> {
    return this.reportResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param q - Global Unique IDentity
   */
  searchResponse(q: string): Observable<HttpResponse<inline_response_200_20>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (q != null) __params = __params.set("q", q.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/search`,
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
        let _body: inline_response_200_20 = null;
        _body = _resp.body as inline_response_200_20
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_20>;
      })
    );
  }

  /**
   * @param q - Global Unique IDentity
   */
  search(q: string): Observable<inline_response_200_20> {
    return this.searchResponse(q).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  searchsResponse(body: body_57): Observable<HttpResponse<search_responses>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/search`,
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
        let _body: search_responses = null;
        _body = _resp.body as search_responses
        return _resp.clone({body: _body}) as HttpResponse<search_responses>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  searchs(body: body_57): Observable<search_responses> {
    return this.searchsResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getServicesResponse(): Observable<HttpResponse<Services>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/services`,
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
        let _body: Services = null;
        _body = _resp.body as Services
        return _resp.clone({body: _body}) as HttpResponse<Services>;
      })
    );
  }

  /**
   */
  getServices(): Observable<Services> {
    return this.getServicesResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  shareResponse(body: body_58): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/share`,
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
  share(body: body_58): Observable<DefaultResponse> {
    return this.shareResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param order_guid - Global Unique IDentity
   */
  getShopOrderResponse(orderGuid?: number): Observable<HttpResponse<inline_response_200_21>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (orderGuid != null) __params = __params.set("order_guid", orderGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/shop_orders`,
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
        let _body: inline_response_200_21 = null;
        _body = _resp.body as inline_response_200_21
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_21>;
      })
    );
  }

  /**
   * @param order_guid - Global Unique IDentity
   */
  getShopOrder(orderGuid?: number): Observable<inline_response_200_21> {
    return this.getShopOrderResponse(orderGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list shop order
   * @param body - undefined
   */
  getShopOrdersResponse(body: body_59): Observable<HttpResponse<ShopOrder[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/shop_orders`,
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
        let _body: ShopOrder[] = null;
        _body = _resp.body as ShopOrder[]
        return _resp.clone({body: _body}) as HttpResponse<ShopOrder[]>;
      })
    );
  }

  /**
   * get list shop order
   * @param body - undefined
   */
  getShopOrders(body: body_59): Observable<ShopOrder[]> {
    return this.getShopOrdersResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getRequestShopResponse(): Observable<HttpResponse<Shop>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/shop_request`,
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
   */
  getRequestShop(): Observable<Shop> {
    return this.getRequestShopResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createRequestShopResponse(body: body_60): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/shop_request`,
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
  createRequestShop(body: body_60): Observable<DefaultResponse> {
    return this.createRequestShopResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateRequestShopResponse(body: body_61): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/shop_request`,
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
  updateRequestShop(body: body_61): Observable<DefaultResponse> {
    return this.updateRequestShopResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param order_guid - Global Unique IDentity
   */
  getShopShippingResponse(orderGuid?: number): Observable<HttpResponse<inline_response_200_22>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (orderGuid != null) __params = __params.set("order_guid", orderGuid.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/shop_shipping`,
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
        let _body: inline_response_200_22 = null;
        _body = _resp.body as inline_response_200_22
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_22>;
      })
    );
  }

  /**
   * @param order_guid - Global Unique IDentity
   */
  getShopShipping(orderGuid?: number): Observable<inline_response_200_22> {
    return this.getShopShippingResponse(orderGuid).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * get list shop order
   * @param body - undefined
   */
  getShopShippingsResponse(body: body_62): Observable<HttpResponse<ShopShipping[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/shop_shipping`,
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
        let _body: ShopShipping[] = null;
        _body = _resp.body as ShopShipping[]
        return _resp.clone({body: _body}) as HttpResponse<ShopShipping[]>;
      })
    );
  }

  /**
   * get list shop order
   * @param body - undefined
   */
  getShopShippings(body: body_62): Observable<ShopShipping[]> {
    return this.getShopShippingsResponse(body).pipe(
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
  }
  /**
   * get all shop friendly
   */
  getFriendlyShopResponse(): Observable<HttpResponse<inline_response_200_23>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "POST",
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
        let _body: inline_response_200_23 = null;
        _body = _resp.body as inline_response_200_23
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_23>;
      })
    );
  }

  /**
   * get all shop friendly
   */
  getFriendlyShop(): Observable<inline_response_200_23> {
    return this.getFriendlyShopResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateShopResponse(body: body_63): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
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
        let _body: DefaultResponse = null;
        _body = _resp.body as DefaultResponse
        return _resp.clone({body: _body}) as HttpResponse<DefaultResponse>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateShop(body: body_63): Observable<DefaultResponse> {
    return this.updateShopResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param qrcode - Global Unique IDentity
   */
  getTempOrderFromQRResponse(qrcode: string): Observable<HttpResponse<Temp_order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (qrcode != null) __params = __params.set("qrcode", qrcode.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/temp_order`,
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
        let _body: Temp_order = null;
        _body = _resp.body as Temp_order
        return _resp.clone({body: _body}) as HttpResponse<Temp_order>;
      })
    );
  }

  /**
   * @param qrcode - Global Unique IDentity
   */
  getTempOrderFromQR(qrcode: string): Observable<Temp_order> {
    return this.getTempOrderFromQRResponse(qrcode).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createTempOrderFromQRResponse(body: Param_create_TempOrder): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/temp_order`,
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
  createTempOrderFromQR(body: Param_create_TempOrder): Observable<DefaultResponse> {
    return this.createTempOrderFromQRResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Return transactions
   * @param transaction_type - undefined
   */
  getTransactionsResponse(transactionType: string): Observable<HttpResponse<Transaction[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (transactionType != null) __params = __params.set("transaction_type", transactionType.toString());
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/transaction`,
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
        let _body: Transaction[] = null;
        _body = _resp.body as Transaction[]
        return _resp.clone({body: _body}) as HttpResponse<Transaction[]>;
      })
    );
  }

  /**
   * Return transactions
   * @param transaction_type - undefined
   */
  getTransactions(transactionType: string): Observable<Transaction[]> {
    return this.getTransactionsResponse(transactionType).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  upload_avatarResponse(body: body_64): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/upload_avatar`,
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
  upload_avatar(body: body_64): Observable<DefaultResponse> {
    return this.upload_avatarResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  upload_coverResponse(body: body_65): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PATCH",
      this.rootUrl + `/upload_cover`,
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
  upload_cover(body: body_65): Observable<DefaultResponse> {
    return this.upload_coverResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  getVouchersResponse(body: body_66): Observable<HttpResponse<Product[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/vouchers`,
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
   * @param body - undefined
   */
  getVouchers(body: body_66): Observable<Product[]> {
    return this.getVouchersResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   */
  getWalletResponse(): Observable<HttpResponse<Wallet>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/wallet`,
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
        let _body: Wallet = null;
        _body = _resp.body as Wallet
        return _resp.clone({body: _body}) as HttpResponse<Wallet>;
      })
    );
  }

  /**
   */
  getWallet(): Observable<Wallet> {
    return this.getWalletResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * action, step
   * switch(action)
   *   case: "deposit":
   *     switch(step)
   *  case "confirm":
   *         request params: null
   *       case "payment":
   *  request params: payment_method
   *       case "payment_option":
   *  request params: payment_method,bankcode
   *   case: "withdrawal":
   *     switch(step)
   *       case "confirm":
   *         request params: null
   *       case "payment":
   *         request params: payment_method
   *       case "payment_option":
   *         if payment_method == paypal {
   *           request params:
   *             payment_method,
   *             paypal_email,
   *             note,
   *             amount
   *         } else {
   *           request params:
   *  payment_method,
   *             note,
   *             bank_branch_name,
   *  bank_name,
   *             bank_account_name,
   *             bank_account_number,
   *  amount
   *   }
   * @param body - undefined
   */
  actionsWalletResponse(body: body_68): Observable<HttpResponse<inline_response_200_24>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `/wallet`,
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
        let _body: inline_response_200_24 = null;
        _body = _resp.body as inline_response_200_24
        return _resp.clone({body: _body}) as HttpResponse<inline_response_200_24>;
      })
    );
  }

  /**
   * action, step
   * switch(action)
   *   case: "deposit":
   *     switch(step)
   *  case "confirm":
   *         request params: null
   *       case "payment":
   *  request params: payment_method
   *       case "payment_option":
   *  request params: payment_method,bankcode
   *   case: "withdrawal":
   *     switch(step)
   *       case "confirm":
   *         request params: null
   *       case "payment":
   *         request params: payment_method
   *       case "payment_option":
   *         if payment_method == paypal {
   *           request params:
   *             payment_method,
   *             paypal_email,
   *             note,
   *             amount
   *         } else {
   *           request params:
   *  payment_method,
   *             note,
   *             bank_branch_name,
   *  bank_name,
   *             bank_account_name,
   *             bank_account_number,
   *  amount
   *   }
   * @param body - undefined
   */
  actionsWallet(body: body_68): Observable<inline_response_200_24> {
    return this.actionsWalletResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createWalletResponse(body: body_67): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/wallet`,
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
  createWallet(body: body_67): Observable<DefaultResponse> {
    return this.createWalletResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  createWishListResponse(body: body_69): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `/wishlist`,
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
  createWishList(body: body_69): Observable<DefaultResponse> {
    return this.createWishListResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param item_guid - undefined
   */
  deleteWishListResponse(itemGuid: number): Observable<HttpResponse<DefaultResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (itemGuid != null) __params = __params.set("item_guid", itemGuid.toString());
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `/wishlist`,
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
   * @param item_guid - undefined
   */
  deleteWishList(itemGuid: number): Observable<DefaultResponse> {
    return this.deleteWishListResponse(itemGuid).pipe(
      map(_r => _r.body)
    );
  }}

export module ApiService {
  export interface DeleteAcceptanceParams {
    type: string;
    guid: number;
  }
  export interface DeleteApprovalParams {
    toGuid: number;
    invitationType: string;
    fromGuid: number;
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
  export interface DeleteLikeParams {
    type: string;
    guid: number;
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
