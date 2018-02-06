/* tslint:disable */
import { Order_item } from './order-_item';

/**
 */
export class Order {
    owner_guid?: string;
    process_status?: string;
    shipping_method?: string;
    payment_method?: string;
    order_item?: Order_item;
}
