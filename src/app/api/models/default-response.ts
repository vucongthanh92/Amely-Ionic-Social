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
}
