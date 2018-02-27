/* tslint:disable */
import { Product } from './product';

/**
 */
export class Item {
    inventory_type?: string;
    guid?: number;
    type?: string;
    time_created?: number;
    title?: string;
    description?: string;
    subtype?: string;
    owner_guid?: number;
    quantity?: number;
    product_snapshot?: Product;
    expiry_type?: string;
    is_special?: string;
    stored_end?: string;
    stored_expried?: boolean;
    used?: boolean;
}
