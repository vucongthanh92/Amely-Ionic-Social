/* tslint:disable */
import { User } from './user';

/**
 */
export class Group {
    membership?: string;
    guid?: number;
    candidate?: User;
    voted?: string;
    title?: string;
    members?: User[];
    time_created?: number;
    owner_guid?: number;
    description?: string;
    type?: string;
    subtype?: string;
    owner?: User;
    membInvite?: string;
    groupMembership?: string;
    has_inventory?: string;
    thought?: string;
    inventory_items?: string;
    avatar?: string;
    cover?: string;
    last_message?: string;
    last_time?: number;
    key?: string;
    chat_type?: string;
}
