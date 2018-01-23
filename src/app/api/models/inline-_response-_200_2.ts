/* tslint:disable */
import { feed } from './feed';
import { user } from './user';
import { mood } from './mood';
import { share } from './share';

/**
 */
export class inline_response_200_2 {
    posts?: feed[];
    users?: user[];
    moods?: mood[];
    shares?: share[];
}
