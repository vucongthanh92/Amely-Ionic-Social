/* tslint:disable */
import { User } from './user';
import { Group } from './group';
import { Event } from './event';
import { Business } from './business';
import { Item } from './item';

/**
 */
export class Gift {
    status?: string;
    guid?: number;
    description?: string;
    title?: string;
    type?: string;
    to_type?: string;
    item_quantity?: number;
    time_created?: number;
    owner?: {};
    to_user?: User;
    to_group?: Group;
    to_event?: Event;
    to_business?: Business;
    item?: Item;
}
