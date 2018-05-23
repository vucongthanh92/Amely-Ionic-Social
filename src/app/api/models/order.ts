/* tslint:disable */
import { Product } from './product';

/**
 */
export class Order {
    owner_guid?: string;
    process_status?: string;
    shipping_method?: string;
    payment_method?: string;
    shipping_fee?: number;
    total?: number;
    order_item?: Product[];
}
