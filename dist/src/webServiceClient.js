"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = __importStar(require("https"));
const package_json_1 = require("../package.json");
const models = __importStar(require("./response/models"));
class WebServiceClient {
    constructor(accountID, licenseKey, timeout = 3000, host = 'minfraud.maxmind.com') {
        this.accountID = accountID;
        this.licenseKey = licenseKey;
        this.timeout = timeout;
        this.host = host;
    }
    factors(transaction) {
        return this.responseFor('factors', transaction.toString(), models.Factors);
    }
    insights(transaction) {
        return this.responseFor('insights', transaction.toString(), models.Insights);
    }
    score(transaction) {
        return this.responseFor('score', transaction.toString(), models.Score);
    }
    reportTransaction(report) {
        return this.responseFor('transactions/report', report.toString());
    }
    responseFor(path, postData, modelClass) {
        const parsedPath = `/minfraud/v2.0/${path}`;
        const url = `https://${this.host}${parsedPath}`;
        const options = {
            auth: `${this.accountID}:${this.licenseKey}`,
            headers: {
                Accept: 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'Content-Type': 'application/json',
                'User-Agent': `minfraud-api-node/${package_json_1.version}`,
            },
            host: this.host,
            method: 'POST',
            path: parsedPath,
            timeout: this.timeout,
        };
        return new Promise((resolve, reject) => {
            const req = https.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    if (response.statusCode && response.statusCode === 204) {
                        return resolve();
                    }
                    try {
                        data = JSON.parse(data);
                    }
                    catch (_a) {
                        return reject(this.handleError({}, response, url));
                    }
                    if (response.statusCode && response.statusCode !== 200) {
                        return reject(this.handleError(data, response, url));
                    }
                    return resolve(new modelClass(data));
                });
            });
            req.on('error', (err) => {
                return reject({
                    code: err.code,
                    error: err.message,
                    url,
                });
            });
            req.write(postData);
            req.end();
        });
    }
    handleError(data, response, url) {
        if (response.statusCode &&
            response.statusCode >= 500 &&
            response.statusCode < 600) {
            return {
                code: 'SERVER_ERROR',
                error: `Received a server error with HTTP status code: ${response.statusCode}`,
                url,
            };
        }
        if (response.statusCode &&
            (response.statusCode < 400 || response.statusCode >= 600)) {
            return {
                code: 'HTTP_STATUS_CODE_ERROR',
                error: `Received an unexpected HTTP status code: ${response.statusCode}`,
                url,
            };
        }
        if (!data.code || !data.error) {
            return {
                code: 'INVALID_RESPONSE_BODY',
                error: 'Received an invalid or unparseable response body',
                url,
            };
        }
        return Object.assign(Object.assign({}, data), { url });
    }
}
exports.default = WebServiceClient;
