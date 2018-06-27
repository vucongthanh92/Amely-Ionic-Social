/* tslint:disable */

/**
 */
export class Transaction {
    shipping_fee?: number;
    guid?: number;
    owner_guid?: number;
    description?: string;
    title?: string;
    type?: string;
    subtype?: string;
    transaction_type?: string;
    status?: string;
    currency?: string;
    quantity?: number;
    tax?: number;
    sub_total?: number;
    time_created?: number;
    commission_price?: number;
    commission_percent?: number;
    related_guid?: number;
    payment_method?: string;
    bank_account_name?: string;
    bank_account_number?: string;
    paypal_email?: string;
    onepay_result?: string;
    order_guid?: number;
    product_snapshot?: string;
    do_guid?: string;
    seller?: string;
}
