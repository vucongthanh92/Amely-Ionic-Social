/* tslint:disable */
import { Shop } from './shop';

/**
 */
export class Product {
    product_group?: string;
    guid?: number;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    subtype?: string;
    tax?: number;
    price?: number;
    quantity?: number;
    weight?: number;
    expiry_type?: number;
    friendly_url?: string;
    currency?: string;
    origin?: string;
    product_order?: string;
    enabled?: string;
    sku?: string;
    storage_duration?: string;
    is_special?: string;
    owner_guid?: number;
    creator_guid?: string;
    custom_attributes?: string;
    number_sold?: number;
    download?: number;
    featured?: number;
    sale_price?: number;
    duration?: number;
    begin_day?: string;
    end_day?: string;
    manufacturer?: string;
    approved?: string;
    current_snapshot?: number;
    voucher_category?: number;
    ticket_category?: number;
    shop_categories?: string;
    market_categories?: string;
    images?: string;
    shop?: Shop;
    images_entities?: string[];
}
