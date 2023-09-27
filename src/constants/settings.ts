export interface IWalletSettings {
    currency: string
    title: string
    text: string
    varificationRequired?: boolean
}

export const WALLETS: IWalletSettings[]  = [
    {
        currency: 'venmo',
        title:'venmo account',
        text: ''
    },
    {
        currency: 'btc',
        title:'btc wallet',
        text: ''
    },
    {
        currency: 'eth',
        title:'eth wallet',
        text: ''
    },
    {
        currency: 'ltc',
        title:'ltc wallet',
        text: ''
    },
    {
        currency: 'paypal',
        title:'paypal account',
        text: '',
        varificationRequired: true
    },
    {
        currency: 'webmoney',
        title:'webmoney account',
        text: ''
    },

]