'use client'
import Bar from '../../components/Bar/Bar'
import Link  from 'next/link'
import Readme from '../../components/funds/readme/Readme'
import TrustBox from '../../components/Content/TrustBox'
import { useFundsContext } from '../../context/FundsContext'
import GiftIcon from '@/components/icons/GiftIcon'
import ArrowRight from '@/components/icons/ArrowRight'
import SelectMethod from './fund-steps/SelectMethod'
import PayPalMethod from './fund-steps/PayPalMethod'
import Summary from './fund-steps/Summary'
import SelectCryptoMethod from './fund-steps/SelectCryptoMethod'
import CryptoAdress from './fund-steps/CryptoAdress'

const getMethod = (method: string) => {
  switch (method) {
    case 'paypal':
      return <PayPalMethod/>
    case 'crypto':
      return <SelectCryptoMethod />
  }
}
const availablePages = [2, 3, 4]

export default function Wallet() {
  const { selectedMethod, addFundsStep, setAddFundsStep } = useFundsContext()
  return (
  <>
    <Bar>
      <div className="flex justify-between items-center h-full px-6  ">
        <div className='flex gap-4 items-center text-white font-Barlow text-[21px] font-medium uppercase'>
            { availablePages.includes(addFundsStep) &&
            <div
              onClick={() => { setAddFundsStep(prev => prev - 1) }}
              className=' hover:opacity-50 duration-200 cursor-pointer '>
              <ArrowRight className='h-6 w-auto rotate-180  ' />
            </div> }
          Add Funds
        </div>
      </div>
    </Bar>
    <header className='w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-0 pb-2 sm:pb-0 sm:h-12 border-b border-darkGrey mt-5 px-3 sm:px-6  relative' >
      <div className='w-full pt-1'>
        <TrustBox />
      </div>
      <Link
        href={'/'}
        className='flex shrink-0 items-center gap-2.5 sm:ml-auto text-sm text-graySecondary uppercase  hover:text-white button'>
        <GiftIcon />
        <span className='uppercase tracking-[1.12px]' >redeem gift card</span>
      </Link>
    </header>
    {addFundsStep === 5
      ? <Summary />
      : <div className='w-full flex justify-center px-6 py-12'>
          <div className='w-full max-w-[672px] flex flex-col gap-12'>
            <Readme>
              <>
                <p>Wallet funds let you easily purchase items on Skinwallet Market without processing payments with every transaction. To keep the procedure safe and controllable, added funds cannot be paid back out, so take that into consideration before choosing a top-up amount.</p>
                <p>Bear in mind that every top-up attempt counts to the monthly top-up limit.</p>
                <p>Your top-up may require an additional KYC and/or AML verification. In such case, please follow the instructions displayed on the screen and wait for the verification process to finalize. The verification may take up to few hours.If, for any reason, your KYC procedure fails, your balance will be refunded.If, for any reason, your KYC procedure fails, your balance will be refunded.</p>
                <p>If, for any reason, your KYC procedure fails, your balance will be refunded.</p>
                <Link
                  href={'/terms-of-service'}
                  className='underline hover:no-underline'
                >
                    Read more about Wallet in our Terms of Service
                </Link>
              </>
            </Readme>
            {addFundsStep === 1
              ? <SelectMethod />
              : addFundsStep === 2
                ? selectedMethod?.methodName && getMethod(selectedMethod.methodName)
                : addFundsStep === 3
                  ? <CryptoAdress />
                  : null }
          </div>
        </div>
      }
  </>
  )
}