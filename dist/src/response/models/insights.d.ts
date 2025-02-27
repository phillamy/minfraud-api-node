import * as records from '../records';
import * as webRecords from '../web-records';
import Score from './score';
export default class Insights extends Score {
    readonly billingAddress?: records.BillingAddress;
    readonly creditCard?: records.CreditCardRecord;
    readonly device?: records.Device;
    readonly email?: records.Email;
    readonly ipAddress?: records.IpAddress;
    readonly shippingAddress?: records.ShippingAddress;
    constructor(response: webRecords.InsightsResponse);
    private maybeGet;
    private getIpAddress;
}
