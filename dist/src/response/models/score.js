"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
class Score {
    constructor(response) {
        this.disposition = (0, utils_1.camelizeResponse)(response.disposition);
        this.fundsRemaining = response.funds_remaining;
        this.id = response.id;
        this.ipAddress = response.ip_address;
        this.queriesRemaining = response.queries_remaining;
        this.riskScore = response.risk_score;
        this.warnings = response.warnings
            ? (0, utils_1.camelizeResponse)(response.warnings)
            : undefined;
    }
}
exports.default = Score;
