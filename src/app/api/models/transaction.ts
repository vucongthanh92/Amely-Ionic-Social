/* tslint:disable */

/**
 */
export class Transaction {
    quantity?: number;
    guid?: number;
    owner_guid?: number;
    description?: string;
    title?: string;
    type?: string;
    subtype?: string;
    transaction_type?: string;
    status?: string;
    currency?: string;
    time_created?: number;
    tax?: number;
    sub_total?: number;
    shipping_fee?: number;
    commission_price?: number;
    commission_percent?: number;
    related_guid?: number;
    payment_method?: string;
    bank_account_name?: string;
    bank_account_number?: string;
    paypal_email?: string;
}
