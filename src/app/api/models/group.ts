/* tslint:disable */
import { GUID } from './guid';
import { User } from './user';

/**
 */
export class Group {
    guid: GUID;
    name: string;
    members: User[];
}
