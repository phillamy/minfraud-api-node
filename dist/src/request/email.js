"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const punycode_1 = __importDefault(require("punycode"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const isFQDN_1 = __importDefault(require("validator/lib/isFQDN"));
const errors_1 = require("../errors");
class Email {
    constructor(email) {
        if (email.address != null && !(0, isEmail_1.default)(email.address)) {
            throw new errors_1.ArgumentError('`email.address` is an invalid email address');
        }
        if (email.domain != null && !(0, isFQDN_1.default)(email.domain)) {
            throw new errors_1.ArgumentError('`email.domain` is an invalid domain');
        }
        if (email.address) {
            if (email.hashAddress) {
                this.address = crypto_1.default
                    .createHash('md5')
                    .update(this.cleanEmailAddress(email.address))
                    .digest('hex');
            }
            else {
                this.address = email.address;
            }
        }
        this.domain = email.domain;
        if (email.domain == null && email.address != null) {
            this.domain = email.address.substring(email.address.indexOf('@') + 1);
        }
    }
    cleanEmailAddress(address) {
        address = address.trim().toLowerCase();
        const atIndex = address.lastIndexOf('@');
        let localPart = address.substring(0, atIndex);
        let domain = address.substring(atIndex + 1);
        domain = this.cleanDomain(domain);
        const separator = domain === 'yahoo.com' ? '-' : '+';
        const separatorIndex = localPart.indexOf(separator);
        if (separatorIndex > 0) {
            localPart = localPart.substring(0, separatorIndex);
        }
        return localPart + '@' + domain;
    }
    cleanDomain(domain) {
        domain = punycode_1.default.toASCII(domain);
        if (Object.prototype.hasOwnProperty.call(Email.typoDomains, domain)) {
            domain = Email.typoDomains[domain];
        }
        return domain;
    }
}
Email.typoDomains = {
    '35gmai.com': 'gmail.com',
    '636gmail.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmail.comu': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'yahoogmail.com': 'gmail.com',
    'putlook.com': 'outlook.com',
};
exports.default = Email;
