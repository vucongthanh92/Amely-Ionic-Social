/* tslint:disable */
import { Product } from './product';

/**
 */
export class Order {
    owner_guid?: string;
    process_status?: string;
    shipping_method?: string;
    payment_method?: string;
    order_item?: Product[];
}
