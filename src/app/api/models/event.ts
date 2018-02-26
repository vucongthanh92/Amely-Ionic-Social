/* tslint:disable */
import { User } from './user';

/**
 */
export class Event {
    has_inventory?: string;
    guid?: number;
    owner?: User;
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
    creator?: User;
    avatar?: string;
    cover?: string;
    members_accepted?: string;
    invites_accepted?: string;
}
