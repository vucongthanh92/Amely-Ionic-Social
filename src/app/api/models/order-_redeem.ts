/* tslint:disable */
import { Product } from './product';
import { Shop } from './shop';

/**
 */
export class Order_redeem {
    products?: Product[];
    shop?: Shop;
    total?: number;
    tax?: number;
    sub_total?: number;
    to_guid?: number;
}
