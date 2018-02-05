/* tslint:disable */
import { User } from './user';

/**
 */
export class Group {
    membInvite?: string;
    guid?: number;
    members?: User[];
    time_created?: number;
    owner_guid?: number;
    description?: string;
    type?: string;
    subtype?: string;
    membership?: string;
    title?: string;
    groupMembership?: string;
    has_inventory?: string;
    thought?: string;
    inventory_items?: string;
    avatar?: string;
    cover?: string;
    last_message?: string;
    last_time?: number;
    key?: string;
}
