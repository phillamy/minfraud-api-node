"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snakecase_keys_1 = __importDefault(require("snakecase-keys"));
const errors_1 = require("../errors");
const account_1 = __importDefault(require("./account"));
const billing_1 = __importDefault(require("./billing"));
const credit_card_1 = __importDefault(require("./credit-card"));
const custom_input_1 = __importDefault(require("./custom-input"));
const device_1 = __importDefault(require("./device"));
const email_1 = __importDefault(require("./email"));
const event_1 = __importDefault(require("./event"));
const order_1 = __importDefault(require("./order"));
const payment_1 = __importDefault(require("./payment"));
const shipping_1 = __importDefault(require("./shipping"));
const shopping_cart_item_1 = __importDefault(require("./shopping-cart-item"));
class Transaction {
    constructor(transaction) {
        this.ensureTypes(transaction);
        Object.assign(this, transaction);
        if (transaction.customInputs != null) {
            this.customInputs = Object.assign({}, ...transaction.customInputs);
        }
    }
    toString() {
        const sanitized = this.sanitizeKeys();
        if (sanitized.order != null && sanitized.order.referrerUri) {
            sanitized.order.referrerUri = sanitized.order.referrerUri.toString();
        }
        return JSON.stringify((0, snakecase_keys_1.default)(sanitized));
    }
    argumentCheck(property, type, key) {
        if (property != null && !(property instanceof type)) {
            throw new errors_1.ArgumentError(`\`${key}\` needs to be an instance of ${type.name}`);
        }
    }
    sanitizeKeys() {
        const sanitized = Object.assign({}, this);
        if (sanitized.billing &&
            Object.prototype.hasOwnProperty.call(sanitized.billing, 'address2')) {
            sanitized.billing.address_2 = sanitized.billing.address2;
            delete sanitized.billing.address2;
        }
        if (sanitized.shipping &&
            Object.prototype.hasOwnProperty.call(sanitized.shipping, 'address2')) {
            sanitized.shipping.address_2 = sanitized.shipping.address2;
            delete sanitized.shipping.address2;
        }
        if (sanitized.creditCard &&
            Object.prototype.hasOwnProperty.call(sanitized.creditCard, 'was3DSecureSuccessful')) {
            sanitized.creditCard.was_3d_secure_successful =
                sanitized.creditCard.was3DSecureSuccessful;
            delete sanitized.creditCard.was3DSecureSuccessful;
        }
        return sanitized;
    }
    checkRegularProps(props) {
        const propTypeMap = {
            account: account_1.default,
            billing: billing_1.default,
            creditCard: credit_card_1.default,
            device: device_1.default,
            email: email_1.default,
            event: event_1.default,
            order: order_1.default,
            payment: payment_1.default,
            shipping: shipping_1.default,
        };
        const keys = Object.keys(propTypeMap);
        for (const key of keys) {
            this.argumentCheck(props[key], propTypeMap[key], key);
        }
    }
    checkArrayProps(props) {
        if (props.shoppingCart != null) {
            for (const [idx, item] of props.shoppingCart.entries()) {
                if (!(item instanceof shopping_cart_item_1.default)) {
                    throw new errors_1.ArgumentError(`\`shoppingCart[${idx}]\` needs to be an instance of ShoppingCartItem`);
                }
            }
        }
        if (props.customInputs != null) {
            for (const [idx, item] of props.customInputs.entries()) {
                if (!(item instanceof custom_input_1.default)) {
                    throw new errors_1.ArgumentError(`\`customInputs[${idx}]\` needs to be an instance of CustomInput`);
                }
            }
        }
    }
    ensureTypes(props) {
        this.checkRegularProps(props);
        this.checkArrayProps(props);
    }
}
exports.default = Transaction;
