/* tslint:disable */
import { CONFIG } from '../config';
import { Injectable } from '@angular/core';

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
  // rootUrl: string = "https://dev.helloqua.com/ws/v1";
  rootUrl: string = CONFIG.url;
}
