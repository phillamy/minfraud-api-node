import Account from './account';
import Billing from './billing';
import CreditCard from './credit-card';
import CustomInput from './custom-input';
import Device from './device';
import Email from './email';
import Event from './event';
import Order from './order';
import Payment from './payment';
import Shipping from './shipping';
import ShoppingCartItem from './shopping-cart-item';
export interface TransactionProps {
    account?: Account;
    billing?: Billing;
    creditCard?: CreditCard;
    customInputs?: CustomInput[];
    device?: Device;
    email?: Email;
    event?: Event;
    order?: Order;
    payment?: Payment;
    shipping?: Shipping;
    shoppingCart?: ShoppingCartItem[];
}
export default class Transaction {
    account?: Account;
    billing?: Billing;
    creditCard?: CreditCard;
    customInputs?: Record<string, boolean | number | string>;
    device?: Device;
    email?: Email;
    event?: Event;
    order?: Order;
    payment?: Payment;
    shipping?: Shipping;
    shoppingCart?: ShoppingCartItem[];
    constructor(transaction: TransactionProps);
    toString(): string;
    private argumentCheck;
    private sanitizeKeys;
    private checkRegularProps;
    private checkArrayProps;
    private ensureTypes;
}
