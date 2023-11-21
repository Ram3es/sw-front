import { TransactionStatus } from "./Transactions";

export interface ISelectMethodProps {
    methods?: PayMethod[]
}
  
export interface PayMethod {
    name: string;
    enabled: boolean;
    allowedTypes: string[];
    feePercentage: number;
    fee: number;
    max: number;
    min: number;
}

export interface IGiftCardRedeemRes {
    value: number,
    code: string,
    used: boolean,
    externalUserId: string
}

export enum EPaymentMethod {
    Stripe = 'stripe',
    Coinbase = 'coinbase',
    Cashapp = 'cashapp',
    Redeem = 'redeem',
}


export interface Checkout {
    productName: string,
    productDescription: string,
    uccessUrl: string,
    cancelUrl: string,
    expiresMinutes: number
}
export interface ICreatePayinRes {
    method: string,
    amount: number,
    externalUserId: string,
    status: TransactionStatus,
    url: string,
}