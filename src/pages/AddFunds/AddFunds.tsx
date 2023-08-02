import Bar from '../../components/Bar/Bar'
import { ReactComponent as GiftIcon } from '../../assets/img/profile/gift-icon.svg'
import { NavLink, Outlet } from 'react-router-dom'
import Readme from '../../components/funds/readme/Readme'
import TrustBox from '../../components/Content/TrustBox'
import SelectMethod from './steps/SelectMethod'
import { useState } from 'react'
import PayPalMethod from './steps/PayPalMethod'
import CryptoMethod from './steps/CryptoMethod'

const getMethod = (method: string) => {
  switch (method) {
    case 'paypal':
      return <PayPalMethod/>
    case 'crypto':
      return <CryptoMethod />
  }
}
const AddFunds = () => {
  const [step, setStep] = useState<number>(1)
  const [selectedMethod, setSelectedMethod] = useState<string>()

  return (
    <>
      <Bar>
        <div className="flex justify-between items-center h-full px-6">
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium uppercase'>
            Add Funds
          </h1>
        </div>
      </Bar>
      <header className='w-full flex items-center h-12 border-b border-darkGrey mt-5 px-3 sm:px-6  relative' >
        <div className='w-full pt-1'>
          <TrustBox />
        </div>
        <NavLink
          to={'/'}
          className='flex shrink-0 items-center gap-2.5 ml-auto text-sm text-graySecondary uppercase  hover:text-white button'>
          <GiftIcon />
          <span className='uppercase tracking-[1.12px]' >redeem gift card</span>
        </NavLink>
      </header>
      <div className='w-full flex justify-center px-6 py-12'>
          <div className='w-full max-w-[672px] flex flex-col gap-12'>
            <Readme />
            {/* <Outlet/> */}
            {step === 1
              ? <SelectMethod
                  setStep={() => { setStep(2) } }
                  selectedMethod={selectedMethod}
                  onSelectMethod={(method) => { setSelectedMethod(method) }}
                  />
              : step === 2
                ? selectedMethod && getMethod(selectedMethod)
                : step === 3 && <></> }

          </div>
        </div>
    </>
  )
}

export default AddFunds
