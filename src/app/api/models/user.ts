/* tslint:disable */
import { Mood } from './mood';
import { Shop } from './shop';

/**
 */
export class User {
    cover?: string;
    guid?: number;
    last_name?: string;
    password?: string;
    first_name?: string;
    email?: string;
    fullname?: string;
    birthdate?: string;
    gender?: string;
    mobilelogin?: string;
    usercurrency?: string;
    address?: string;
    avatar?: string;
    username?: string;
    birthdate_hidden?: string;
    mobile_hidden?: string;
    friends_hidden?: string;
    full_address?: string;
    chain_store?: string;
    offer_count?: number;
    gift_count?: number;
    mood?: Mood;
    shop?: Shop;
    province?: string;
    district?: string;
    ward?: string;
}
