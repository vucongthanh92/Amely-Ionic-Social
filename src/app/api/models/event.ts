/* tslint:disable */
import { Product } from './product';

/**
 */
export class Event {
    has_inventory?: string;
    guid?: number;
    description?: string;
    title?: string;
    type?: string;
    subtype?: string;
    start_date?: number;
    end_date?: number;
    country?: string;
    location?: string;
    template?: string;
    time_created?: number;
    status?: string;
    members?: string;
    invites?: string;
    friendly_url?: string;
    published?: string;
    owner_user?: number;
    creator?: Product;
    avatar?: string;
    cover?: string;
    members_accepted?: string;
    invites_accepted?: string;
}
