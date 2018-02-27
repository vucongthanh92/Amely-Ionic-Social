/* tslint:disable */

/**
 */
export class Transaction {
    status?: string;
    guid?: number;
    owner_guid?: number;
    description?: string;
    title?: string;
    type?: string;
    subtype?: string;
    transaction_type?: string;
    time_created?: number;
    currency?: string;
    quantity?: number;
    related_guid?: number;
    payment_method?: string;
    bank_account_name?: string;
    bank_account_number?: string;
    paypal_email?: string;
}
