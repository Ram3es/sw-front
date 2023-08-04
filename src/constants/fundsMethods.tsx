import { ReactComponent as Paypal } from '../assets/img/payout/logo-ppcom-white.svg'
import { ReactComponent as Crypto } from '../assets/img/funds/crypto.svg'
import { ReactComponent as Card } from '../assets/img/funds/visa-mastercard.svg'
import { ReactComponent as Bitcoin } from '../assets/img/funds/bitcoin-logo.svg'
import { ReactComponent as Skinwallet } from '../assets/img/funds/skinwallet-instant.svg'
import GiftContent from '../components/funds/methods/GiftContent'
import MethodFee from '../components/funds/methods/MethodFee'
import { format } from '../helpers/numberFormater'
import PayPalContent from '../components/funds/methods/PayPalContent'
import G2AContent from '../components/funds/methods/G2AContent'
import GiftMethodTitleLabel from '../components/funds/methods/GiftMethodTitle'

export interface IMethod {
  methodName: string
  title: string
  titleLabel?: JSX.Element
  content?: JSX.Element
  logo?: JSX.Element
  label?: string
  summary?: string
  topUpFee?: string
}

export const FUND_METHODS: IMethod[] = [
  {
    methodName: 'gift',
    title: 'Skinwallet Gift Cards',
    titleLabel: <GiftMethodTitleLabel />,
    label: 'select to redeem gift card',
    content: <GiftContent/>
  },
  {
    methodName: 'paypal',
    title: 'PayPal',
    logo: <Paypal/>,
    content: <PayPalContent/>,
    label: 'powered by conotoxia pay'
  },
  {
    methodName: 'card',
    title: 'card',
    logo: <Card/>,
    content: <MethodFee topUpFee={`3.1% + $${format(30)}`} />,
    label: 'powered by STRIPE'
  },
  {
    methodName: 'crypto',
    title: 'crypto',
    logo: <Crypto/>,
    content: <MethodFee topUpFee='0%' />,
    summary: 'Aenean rhoncus ligula nibh, efficitur molestie elit aliquam quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
  },
  {
    methodName: 'g2a',
    title: 'G2A Pay',
    logo: <Bitcoin/>,
    content: <G2AContent/>,
    summary: 'To browse all top-up methods, switch locations on G2A Pay website.'
  },
  {
    methodName: 'skinwallet',
    title: 'balance',
    logo: <Skinwallet/>,
    content: <MethodFee topUpFee='0%' />,
    summary: 'Use this method to transfer existing Balance from Skinwallet Instant or to sell virtual items instantly. After confirming this method, you will be redirected to the Skinwallet Instant website where you can finish the transaction.'
  }
]

export type TErrors = Record<string, { status: boolean, message?: string, errorClass?: string, relative?: string }>

export const ERRORS: TErrors = {
  excededAmount: {
    status: false,
    errorClass: 'flex items gap-2 center text-swOrange text-sm font-normal leading-[14px]',
    message: 'The amount you have entered exceeded the monthly limit. We set the maximum value for you.',
    relative: 'amount'
  },
  lowAmount: {
    status: false,
    errorClass: 'flex items gap-2 center text-swOrange text-sm font-normal leading-[14px]',
    message: 'The amount you have entered is below the minimum. We set the minimum value for you.',
    relative: 'amount'
  },
  limit: {
    status: false,
    relative: 'amount'
  },
  wrongCoupon: {
    status: false,
    errorClass: 'flex items gap-2 center text-swRed text-sm font-normal leading-[14px]',
    message: 'Invalid or wrong code. Please check the spelling or use a different code.',
    relative: 'coupon'
  },
  excededMonthly: {
    status: false,
    message: 'top-up limit exceeded'
  }
}
