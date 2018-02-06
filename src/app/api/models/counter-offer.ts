/* tslint:disable */
import { Product } from './product';
import { User } from './user';
import { Offer } from './offer';

/**
 */
export class CounterOffer {
    status?: string;
    guid?: number;
    description?: string;
    title?: string;
    type?: string;
    subtype?: string;
    time_created?: number;
    quantity?: number;
    so_guid?: number;
    product_snapshot?: Product;
    owner?: User;
    offer?: Offer;
}
