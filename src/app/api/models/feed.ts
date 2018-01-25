/* tslint:disable */
import { Mood } from './mood';
import { Feed_description } from './feed-_description';

/**
 */
export class Feed {
    access?: number;
    guid?: number;
    type?: string;
    subtype?: string;
    mood?: Mood;
    poster_guid?: number;
    owner_guid?: number;
    likes?: number;
    comments?: number;
    title?: string;
    wallphoto?: string[];
    description: string;
    time_created: any;
    item_type: string;
}
