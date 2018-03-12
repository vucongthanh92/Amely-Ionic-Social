/* tslint:disable */
import { Store } from './store';

/**
 */
export class Shop {
    cover?: string;
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
    owner_address?: string;
    owner_ssn?: string;
    time_created?: number;
    contact?: string;
    lat?: number;
    lng?: number;
    introduce?: string;
    featured?: string;
    adjourn_price?: number;
    currency?: string;
    shipping_method?: string;
    avatar?: string;
    reason?: string;
    liked?: boolean;
    advertise_guid?: number;
    stores?: Store[];
}
