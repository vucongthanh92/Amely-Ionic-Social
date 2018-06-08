/* tslint:disable */
import { Product } from './product';

/**
 */
export class Delivery_order {
    shipping_province?: string;
    guid?: number;
    owner_guid?: number;
    description?: string;
    status?: boolean;
    title?: string;
    shipping_fullname?: string;
    shipping_phone?: string;
    shipping_address?: string;
    time_created?: string;
    shipping_district?: string;
    shipping_ward?: string;
    shipping_note?: string;
    shipping_method?: string;
    shipping_fee?: string;
    item?: string;
    quantity?: number;
    shipping_owner?: string;
    product?: Product;
}
