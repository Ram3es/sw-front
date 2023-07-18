import Venmo from '../assets/img/payout/simple-icons_venmo.svg'
import Paypal from '../assets/img/payout/logo-ppcom-white.svg'
import Crypto from '../assets/img/payout/logo-crypto-group.png'
import Webmoney from '../assets/img/payout/logo-webmoney.svg'
export const PAYOUT_METHODS = [
  {
    name: 'venmo',
    logo: Venmo,
    timeline: 'Instant Payout',
    placeholder: 'Enter Username or Phone Number',
    methodTitle: 'Venmo Account'

  },
  {
    name: 'paypal',
    logo: Paypal,
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter PayPal email',
    methodTitle: 'PayPal Email'

  },
  {
    name: 'crypto',
    logo: Crypto,
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter Address',
    methodTitle: 'Crypto Address'

  },
  {
    name: 'webmoney',
    logo: Webmoney,
    timeline: 'Instant Payout',
    placeholder: 'Enter Webmoney Credentials'

  }

]
