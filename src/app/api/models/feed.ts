/* tslint:disable */
import { GUID } from './guid';

/**
 */
export class Feed {
    guid?: GUID;
    owner_guid: GUID;
    type?: string;
    content: string;
    friends: string[];
    location: string;
    privacy: number;
    ossn_photo: string;
}
