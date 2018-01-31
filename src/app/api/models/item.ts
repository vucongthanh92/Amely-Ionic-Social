/* tslint:disable */
import { Product } from './product';

/**
 */
export class Item {
    inventory_type?: string;
    guid?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    subtype?: string;
    owner_guid?: string;
    quantity?: string;
    product_snapshot?: Product;
    expiry_type?: string;
    is_special?: string;
    stored_end?: string;
    stored_expried?: boolean;
}