import Transaction from './request/transaction';
import TransactionReport from './request/transaction-report';
import * as models from './response/models';
export default class WebServiceClient {
    private accountID;
    private host;
    private licenseKey;
    private timeout;
    constructor(accountID: string, licenseKey: string, timeout?: number, host?: string);
    factors(transaction: Transaction): Promise<models.Factors>;
    insights(transaction: Transaction): Promise<models.Insights>;
    score(transaction: Transaction): Promise<models.Score>;
    reportTransaction(report: TransactionReport): Promise<void>;
    private responseFor;
    private handleError;
}
