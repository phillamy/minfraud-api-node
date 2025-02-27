"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const geoip2_node_1 = require("@maxmind/geoip2-node");
const utils_1 = require("../../utils");
const score_1 = __importDefault(require("./score"));
class Insights extends score_1.default {
    constructor(response) {
        super(response);
        this.billingAddress = this.maybeGet(response, 'billing_address');
        this.creditCard = this.maybeGet(response, 'credit_card');
        this.device = this.maybeGet(response, 'device');
        this.email = this.maybeGet(response, 'email');
        this.ipAddress = this.getIpAddress(response);
        this.shippingAddress = this.maybeGet(response, 'shipping_address');
    }
    maybeGet(response, prop) {
        return response[prop] ? (0, utils_1.camelizeResponse)(response[prop]) : undefined;
    }
    getIpAddress(response) {
        if (!response.ip_address) {
            return undefined;
        }
        const insights = new geoip2_node_1.Insights(response.ip_address);
        if (insights.country && response.ip_address.country) {
            insights.country.isHighRisk = response.ip_address.country.is_high_risk;
        }
        if (insights.location && response.ip_address.location) {
            insights.location.localTime = response.ip_address.location.local_time;
        }
        insights.risk = response.ip_address.risk;
        insights.riskReasons = response.ip_address
            .risk_reasons;
        delete insights.maxmind;
        return insights;
    }
}
exports.default = Insights;
