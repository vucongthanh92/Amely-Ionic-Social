/* tslint:disable */
import { Product } from './product';

/**
 */
export class Delivery_order {
    shipping_ward?: string;
    guid?: number;
    owner_guid?: number;
    description?: string;
    status?: boolean;
    title?: string;
    shipping_fullname?: string;
    shipping_phone?: string;
    shipping_address?: string;
    shipping_province?: string;
    shipping_district?: string;
    time_created?: string;
    shipping_note?: string;
    shipping_method?: string;
    shipping_fee?: string;
    item?: string;
    quantity?: number;
    shipping_owner?: string;
    ghtk_success?: string;
    product?: Product;
    products?: Product[];
    address?: string;
}
