/* tslint:disable */
import { User } from './user';
import { Gift } from './gift';
import { Offer } from './offer';

/**
 */
export class Notification {
    username?: string;
    item_guid?: number;
    item_quantity?: number;
    item_title?: string;
    notification_type?: string;
    poster_guid?: string;
    status?: string;
    subject_guid?: number;
    time_created?: number;
    item_image?: number;
    viewed?: boolean;
    title?: string;
    from_user?: User;
    to_user?: User;
    group?: User;
    event?: User;
    business?: User;
    gift?: Gift;
    offer?: Offer;
}
