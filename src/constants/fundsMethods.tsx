import GiftContent from '../components/funds/methods/GiftContent'
import MethodFee from '../components/funds/methods/MethodFee'
import { format } from '../helpers/numberFormater'
import PayPalContent from '../components/funds/methods/PayPalContent'
import G2AContent from '../components/funds/methods/G2AContent'
import GiftMethodTitleLabel from '../components/funds/methods/GiftMethodTitle'
import LogoPayPal from '@/components/icons/logo/LogoPayPal'
import VisaMastercard from '@/components/icons/logo/VisaMastercard'
import CryptoIcon from '@/components/icons/wallet/CryptoIcon'
import LogoBitcoin from '@/components/icons/logo/LogoBitcoin'
import SkinwaletInstant from '@/components/icons/logo/SkinwaletInstant'

export interface IMethod {
  methodName: string
  title: string
  titleLabel?: JSX.Element
  renderContent?:(value?: IMethodContentProps) => JSX.Element
  logo?: JSX.Element
  label?: string
  summary?: string
  topUpFee?: string
  isAvaible?: boolean
}

export interface IMethodContentProps {
  fee: string
  limit: string
  
}

export const FUND_METHODS: IMethod[] = [
  {
    methodName: 'stripe',
    title: 'card',
    logo: <VisaMastercard/>,
    renderContent: (value) => <MethodFee value={value} />,
    label: 'powered by STRIPE'
  },
  {
    methodName: 'cashapp',
    title: 'Cashapp',
    renderContent: (value) => <MethodFee value={value} />,
    label: 'select to Cashapp',
  },
  {
    methodName: 'coinbase',
    title: 'Coinbase',
    renderContent: (value) => <MethodFee value={value} />,
    label: 'select to Coinbase',
  },
  {
    methodName: 'gift',
    title: 'Skinwallet Gift Cards',
    titleLabel: <GiftMethodTitleLabel />,
    label: 'select to redeem gift card',
    renderContent: () => <GiftContent/>
  },
  // {
  //   methodName: 'paypal',
  //   title: 'PayPal',
  //   logo: <LogoPayPal/>,
  //   content: <PayPalContent/>,
  //   label: 'powered by conotoxia pay'
  // },
  // {
  //   methodName: 'crypto',
  //   title: 'crypto',
  //   logo: <CryptoIcon/>,
  //   content: <MethodFee topUpFee='0%' />,
  //   summary: 'Aenean rhoncus ligula nibh, efficitur molestie elit aliquam quis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
  // },
  // {
  //   methodName: 'g2a',
  //   title: 'G2A Pay',
  //   logo: <LogoBitcoin/>,
  //   content: <G2AContent/>,
  //   summary: 'To browse all top-up methods, switch locations on G2A Pay website.'
  // },
  // {
  //   methodName: 'skinwallet',
  //   title: 'balance',
  //   logo: <SkinwaletInstant />,
  //   content: <MethodFee topUpFee='0%' />,
  //   summary: 'Use this method to transfer existing Balance from Skinwallet Instant or to sell virtual items instantly. After confirming this method, you will be redirected to the Skinwallet Instant website where you can finish the transaction.'
  // }
]

export type TErrors = Record<string, { status: boolean, message?: string, errorClass?: string, relative?: string, msgWithIcon?:boolean }>

export const ERRORS: TErrors = {
  excededAmount: {
    status: false,
    errorClass: 'flex items gap-2 center text-swOrange text-sm font-normal leading-[14px]',
    message: 'The amount you have entered exceeded the monthly limit. We set the maximum value for you.',
    relative: 'amount',
    msgWithIcon: true
  },
  lowAmount: {
    status: false,
    errorClass: 'flex items gap-2 center text-swOrange text-sm font-normal leading-[14px]',
    message: 'The amount you have entered is below the minimum. We set the minimum value for you.',
    relative: 'amount',
    msgWithIcon: true
  },
  limit: {
    status: false,
    relative: 'amount',
  },
  wrongCoupon: {
    status: false,
    errorClass: 'flex items gap-2 center text-swRed text-sm font-normal leading-[14px]',
    message: 'Invalid or wrong code. Please check the spelling or use a different code.',
    relative: 'coupon',
    msgWithIcon: true
  },
  excededMonthly: {
    status: false,
    message: 'top-up limit exceeded'
  }
}
