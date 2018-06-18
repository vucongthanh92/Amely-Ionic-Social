/* tslint:disable */
import { Injectable } from '@angular/core';
import { CONFIG } from '../config';

/**
 * Contains global configuration for API services
 */
@Injectable()
export class ApiConfiguration {
  rootUrl: string = CONFIG.url;
}
