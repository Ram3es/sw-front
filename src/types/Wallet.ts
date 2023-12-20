import { ETransactionStatus } from "./Transactions";

export interface ISelectMethodProps {
    methods?: PayMethod[]
}
  
export interface PayMethod {
    name: EPaymentMethod;
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
    Paypal = 'paypal',
    Venmo = 'venmo',
    Bitcoin = 'bitcoin',
    Ethereum = 'ethereum',
    Litecoin = 'litecoin'
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
    status: ETransactionStatus,
    url: string,
}

export interface IUserWallet {
    id: number
    walletAddress: string
    method: EPaymentMethod
}

export interface IPayoutDataReq {
    amount: number
    balanceAmount: number
    method: EPaymentMethod
    walletAddress: string
}

