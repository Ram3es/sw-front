import { EPaymentMethod } from "@/types/Wallet"

export interface IWalletSettings {
    currency: EPaymentMethod
    title: string
    text: string
    varificationRequired?: boolean
}

export const WALLETS: IWalletSettings[]  = [
    {
        currency: EPaymentMethod.Venmo,
        title:'venmo account',
        text: ''
    },
    {
        currency: EPaymentMethod.Bitcoin,
        title:'btc wallet',
        text: ''
    },
    {
        currency: EPaymentMethod.Ethereum,
        title:'eth wallet',
        text: ''
    },
    {
        currency: EPaymentMethod.Litecoin,
        title:'ltc wallet',
        text: ''
    },
    {
        currency: EPaymentMethod.Paypal ,
        title:'paypal account',
        text: '',
        varificationRequired: true
    },
    // {
    //     currency: 'webmoney',
    //     title:'webmoney account',
    //     text: ''
    // },

]