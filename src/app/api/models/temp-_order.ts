/* tslint:disable */
import { Shop } from './shop';
import { User } from './user';
import { Item } from './item';

/**
 */
export class Temp_order {
    products?: {};
    shop?: Shop;
    user?: User;
    total?: number;
    tax?: number;
    sub_total?: number;
    to_guid?: number;
    items?: Item[][];
}
