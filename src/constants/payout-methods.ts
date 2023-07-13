import Venmo from '../assets/img/payout/simple-icons_venmo.svg'
import Paypal from '../assets/img/payout/logo-ppcom-white.svg'
import Crypto from '../assets/img/payout/logo-crypto-group.png'
import Webmoney from '../assets/img/payout/logo-webmoney.svg'
export const PAYOUT_METHODS = [
  {
    name: 'venmo',
    logo: Venmo,
    timeline: 'Instant Payout'

  },
  {
    name: 'paypal',
    logo: Paypal,
    timeline: '2-24h (avg. 6h)'
  },
  {
    name: 'crypto',
    logo: Crypto,
    timeline: '2-24h (avg. 6h)'
  },
  {
    name: 'webmoney',
    logo: Webmoney,
    timeline: 'Instant Payout'
  }

]
