/* tslint:disable */
import { User } from './user';

/**
 */
export class DefaultResponse {
    token?: string;
    error?: string;
    status?: boolean;
    validation?: User;
    code?: string;
    url?: string;
    to_guid?: number;
    guid?: string;
}
