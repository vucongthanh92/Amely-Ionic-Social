/* tslint:disable */
import { Product } from './product';
import { Shop } from './shop';
import { Order } from './order';

/**
 */
export class OrderGet {
    items?: Product[];
    shops?: Shop[];
    order?: Order;
}
