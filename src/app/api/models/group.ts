/* tslint:disable */
import { User } from './user';

/**
 */
export class Group {
    membership?: string;
    guid?: number;
    members?: User[];
    time_created?: number;
    owner_guid?: number;
    description?: string;
    type?: string;
    subtype?: string;
    title?: string;
    membInvite?: string;
    groupMembership?: string;
    has_inventory?: string;
    thought?: string;
    inventory_items?: string;
    avatar?: string;
    cover?: string;
}
