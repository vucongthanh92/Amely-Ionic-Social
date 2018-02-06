/* tslint:disable */
import { Product } from './product';

/**
 */
export class Delivery_order {
    shipping_district?: string;
    guid?: number;
    owner_guid?: number;
    description?: string;
    title?: string;
    shipping_fullname?: string;
    shipping_phone?: string;
    shipping_address?: string;
    shipping_province?: string;
    time_created?: string;
    shipping_ward?: string;
    shipping_note?: string;
    shipping_method?: string;
    shipping_fee?: string;
    item?: string;
    quantity?: number;
    status?: string;
    shipping_owner?: string;
    product?: Product;
}
