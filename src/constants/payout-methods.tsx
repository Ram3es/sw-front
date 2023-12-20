import LogoPayPal from "@/components/icons/logo/LogoPayPal";
import LogoBtc from "@/components/icons/payments/payout/LogoBtc";
import LogoEthereum from "@/components/icons/payments/payout/LogoEthereum";
import LogoVenmo from "@/components/icons/payments/payout/LogoVenmo";
import LogoLtc from "../../public/img/payout/logo-ltc.png"
import Image from "next/image";

export const PAYOUT_METHODS:Record<string, any>= {
  venmo: {
    name: 'venmo',
    logo: <LogoVenmo />,
    timeline: 'Instant Payout',
    placeholder: 'Enter Username or Phone Number',
    methodTitle: 'Venmo Account'

  },
  paypal: {
    name: 'paypal',
    logo: <LogoPayPal />,
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter PayPal email',
    methodTitle: 'PayPal Email'

  },
  bitcoin: {
    name: 'bitcoin',
    logo: <LogoBtc />,
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter Address',
    methodTitle: 'Bitcoin Address'

  },
  ethereum: {
    name: 'ethereum',
    logo: <LogoEthereum />,
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter Address',
    methodTitle: 'Ethereum Address'

  },
  litecoin:{
    name: 'litecoin',
    logo: <Image src={LogoLtc} alt="logo-ltc"  />,
    timeline: '2-24h (avg. 6h)',
    placeholder: 'Enter Address',
    methodTitle: 'Litecoin Address'

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
