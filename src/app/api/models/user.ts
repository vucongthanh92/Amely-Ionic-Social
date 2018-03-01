/* tslint:disable */
import { Mood } from './mood';
import { Shop } from './shop';

/**
 */
export class User {
    usercurrency?: string;
    guid?: number;
    last_name?: string;
    first_name?: string;
    email?: string;
    fullname?: string;
    birthdate?: string;
    gender?: string;
    mobilelogin?: string;
    username?: string;
    address?: string;
    avatar?: string;
    cover?: string;
    birthdate_hidden?: string;
    mobile_hidden?: string;
    friends_hidden?: string;
    mood?: Mood;
    shop?: Shop;
}
