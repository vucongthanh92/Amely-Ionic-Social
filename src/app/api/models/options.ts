/* tslint:disable */
import { Bankcode } from './bankcode';

/**
 */
export class Options {
    standard?: string;
    atm?: Bankcode;
    creditcard?: Bankcode;
    opatm?: Bankcode;
    opcreditcard?: Bankcode;
    wallet?: string;
}
