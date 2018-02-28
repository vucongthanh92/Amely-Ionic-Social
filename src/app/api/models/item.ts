/* tslint:disable */
import { Product } from './product';

/**
 */
export class Item {
    quantity?: number;
    guid?: number;
    type?: string;
    time_created?: number;
    title?: string;
    description?: string;
    subtype?: string;
    inventory_type?: string;
    owner_guid?: number;
    product_snapshot?: Product;
    expiry_type?: string;
    is_special?: string;
    stored_end?: string;
    stored_expried?: boolean;
    used?: boolean;
    wishlist?: string;
    givelist?: string;
}
