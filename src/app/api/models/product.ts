/* tslint:disable */
import { Shop } from './shop';

/**
 */
export class Product {
    is_special?: string;
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
    display_price?: number;
    display_old_price?: number;
    display_currency?: string;
    qty?: number;
    advertise_guid?: number;
    friendly_url?: string;
    currency?: string;
    origin?: string;
    product_order?: string;
    enabled?: string;
    sku?: string;
    storage_duration?: string;
    owner_guid?: number;
    product_group?: string;
    creator_guid?: string;
    custom_attributes?: string;
    number_sold?: number;
    redeem_quantity?: number;
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
    hasInventory?: number;
    display_quantity?: number;
    ticket_category?: number;
    shop_categories?: string;
    market_categories?: string;
    images?: string;
    shop?: Shop;
    images_entities?: string[];
    unit?: string;
}
