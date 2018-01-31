/* tslint:disable */
import { Store } from './store';

/**
 */
export class Shop {
    owner_address?: string;
    guid?: number;
    owner_guid?: number;
    description?: string;
    title?: string;
    shop_phone?: string;
    shop_address?: string;
    shop_bidn?: string;
    friendly_url?: string;
    status?: string;
    owner_name?: string;
    owner_phone?: string;
    time_created?: number;
    owner_ssn?: string;
    cover?: string;
    contact?: string;
    lat?: number;
    lng?: number;
    introduce?: string;
    featured?: string;
    adjourn_price?: number;
    currency?: string;
    shipping_method?: string;
    avatar?: string;
    stores?: Store[];
}
