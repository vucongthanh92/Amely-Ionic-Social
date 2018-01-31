/* tslint:disable */
import { Shop } from './shop';

/**
 */
export class Product {
    product_group?: string;
    guid?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    subtype?: string;
    tax?: string;
    price?: string;
    quantity?: string;
    weight?: string;
    expiry_type?: string;
    friendly_url?: string;
    currency?: string;
    origin?: string;
    product_order?: string;
    enabled?: string;
    sku?: string;
    storage_duration?: string;
    is_special?: string;
    owner_guid?: string;
    creator_guid?: string;
    custom_attributes?: string;
    number_sold?: string;
    download?: string;
    featured?: string;
    sale_price?: string;
    duration?: string;
    begin_day?: string;
    end_day?: string;
    manufacturer?: string;
    approved?: string;
    current_snapshot?: string;
    voucher_category?: string;
    ticket_category?: string;
    shop_categories?: string;
    market_categories?: string;
    images?: string;
    shop?: Shop;
    images_entities?: string[];
}
