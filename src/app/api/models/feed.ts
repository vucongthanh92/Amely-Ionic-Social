/* tslint:disable */
import { Mood } from './mood';
import { Feed_description } from './feed-_description';

/**
 */
export class Feed {
    likes?: number;
    guid?: number;
    type?: string;
    subtype?: string;
    mood?: Mood;
    poster_guid?: number;
    access?: number;
    owner_guid?: number;
    comments?: number;
    item_type?: string;
    item_guid?: number;
    title?: string;
    wallphoto?: string[];
    time_created?: number;
    description?: any;
}
