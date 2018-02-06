/* tslint:disable */

/**
 * switch(offer_type)
 *   case "random"
 *     request: random_expiration
 *   case "giveaway"
 *     request: giveaway_approval
 */
export class body_25 {
    location_lat?: string;
    item_guid?: number;
    random_expiration?: boolean;
    giveaway_approval?: boolean;
    target?: string;
    offer_type?: string;
    location_lng?: string;
    duration?: number;
    note?: string;
    quantity?: number;
    limit_counter?: string;
}
