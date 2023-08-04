import Bar from '../../components/Bar/Bar'
import { ReactComponent as GiftIcon } from '../../assets/img/profile/gift-icon.svg'
import { NavLink } from 'react-router-dom'
import Readme from '../../components/funds/readme/Readme'
import TrustBox from '../../components/Content/TrustBox'
import SelectMethod from './steps/SelectMethod'
import PayPalMethod from './steps/PayPalMethod'
import CryptoMethod from './steps/CryptoMethod'
import { useFundsContext } from '../../context/FundsContext'
import Summary from './steps/Summary'
import { ReactComponent as Arrow } from '../../assets/img/market/arrow-right.svg'

const getMethod = (method: string) => {
  switch (method) {
    case 'paypal':
      return <PayPalMethod/>
    case 'crypto':
      return <CryptoMethod />
  }
}
const AddFunds = () => {
  const { selectedMethod, addFundsStep, setAddFundsStep } = useFundsContext()

  return (
    <div className='relative'>
      <Bar>
        <div className="flex justify-between items-center h-full px-6  ">
          <div className='flex gap-4 items-center text-white font-["Barlow"] text-[21px] font-medium uppercase'>
              { addFundsStep > 1 &&
              <div
                onClick={() => { setAddFundsStep(prev => prev - 1) }}
                className=' hover:opacity-50 duration-200 cursor-pointer '>
                <Arrow className='h-6 w-auto rotate-180  ' />
              </div> }
            Add Funds
          </div>
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
      {addFundsStep === 3
        ? <Summary />
        : <div className='w-full flex justify-center px-6 py-12'>
            <div className='w-full max-w-[672px] flex flex-col gap-12'>
              <Readme />
              {addFundsStep === 1
                ? <SelectMethod />
                : addFundsStep === 2
                  ? selectedMethod?.methodName && getMethod(selectedMethod.methodName)
                  : null }
            </div>
          </div>
          }
    </div>
  )
}

export default AddFunds
