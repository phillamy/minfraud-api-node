import * as records from '../records';
import * as webRecords from '../web-records';
export default class Score {
    readonly disposition?: records.Disposition;
    readonly fundsRemaining: number;
    readonly id: string;
    readonly ipAddress?: records.ScoreIpAddress;
    readonly queriesRemaining: number;
    readonly riskScore: number;
    readonly warnings?: records.Warning[];
    constructor(response: webRecords.ScoreResponse);
}
