/* tslint:disable */
import { Product } from './product';
import { User } from './user';
import { CounterOffer } from './counter-offer';

/**
 */
export class Offer {
    location_lng?: number;
    guid?: number;
    description?: string;
    title?: string;
    type?: string;
    subtype?: string;
    target?: string;
    duration?: number;
    quantity?: number;
    offer_type?: string;
    location_lat?: number;
    time_created?: number;
    expried?: number;
    status?: string;
    so_guid?: number;
    offered?: boolean;
    current_time?: number;
    time_end?: number;
    bookmarked?: string;
    product_snapshot?: Product;
    owner?: User;
    counter_offers?: CounterOffer;
}
