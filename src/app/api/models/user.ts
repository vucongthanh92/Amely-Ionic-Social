/* tslint:disable */
import { Mood } from './mood';
import { Shop } from './shop';

/**
 */
export class User {
    mobilelogin?: string;
    guid?: number;
    last_name?: string;
    password?: string;
    first_name?: string;
    email?: string;
    fullname?: string;
    birthdate?: string;
    gender?: string;
    username?: string;
    usercurrency?: string;
    address?: string;
    avatar?: string;
    cover?: string;
    birthdate_hidden?: string;
    mobile_hidden?: string;
    friends_hidden?: string;
    mood?: Mood;
    shop?: Shop;
    offer_count: number
    gift_count: number
}
