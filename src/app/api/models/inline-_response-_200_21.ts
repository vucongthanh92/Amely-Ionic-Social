/* tslint:disable */
import { Product } from './product';
import { OrderInfo } from './order-info';
import { DeliveryInfo } from './delivery-info';
import { PaymentInfo } from './payment-info';

/**
 */
export class inline_response_200_21 {
    product?: Product[];
    order?: OrderInfo;
    delivery_info?: DeliveryInfo;
    payment_info?: PaymentInfo;
}
