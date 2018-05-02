/* tslint:disable */
import { Shop } from './shop';
import { Item } from './item';
import { User } from './user';

/**
 */
export class Temp_order {
    products?: {};
    shop?: Shop;
    total?: number;
    tax?: number;
    sub_total?: number;
    to_guid?: number;
    user?: User;
    items?: Item[][];
}
