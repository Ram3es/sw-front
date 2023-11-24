import paypal from '../../public/img/payout/logo-paypal.svg'

export const PAYOUT_METHODS:Record<string, any>= {
  venmo: {
    name: 'venmo',
    logo: '/img/payout/simple-icons_venmo.svg',
    timeline: 'Instant Payout',
    placeholder: 'Enter Username or Phone Number',
    methodTitle: 'Venmo Account'

  },
  paypal: {
    name: 'paypal',
    logo: '/img/payout/ppcom-white 1.svg',
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter PayPal email',
    methodTitle: 'PayPal Email'

  },
  bitcoin: {
    name: 'bitcoin',
    logo: '/img/payout/logo-crypto-group.png',
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter Address',
    methodTitle: 'Crypto Address'

  },
  litecoin:{
    name: 'litecoin',
    logo: '/img/payout/logo-crypto-group.png',
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter Address',
    methodTitle: 'Crypto Address'

  },
  // {
  //   name: 'crypto',
  //   logo: '/img/payout/logo-crypto-group.png',
  //   timeline: '2-24h (avg. 6h)',
  //   placeholder: 'Enter Address',
  //   methodTitle: 'Crypto Address'

  // },
  // {
  //   name: 'webmoney',
  //   logo: '/img/payout/logo-webmoney.svg',
  //   timeline: 'Instant Payout',
  //   placeholder: 'Enter Webmoney Credentials'

  // }

}
