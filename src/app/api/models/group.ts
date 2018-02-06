/* tslint:disable */
import { User } from './user';

/**
 */
export class Group {
    membInvite?: string;
    guid?: number;
    title?: string;
    members?: User[];
    time_created?: number;
    owner_guid?: number;
    description?: string;
    type?: string;
    subtype?: string;
    membership?: string;
    owner?: User;
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
