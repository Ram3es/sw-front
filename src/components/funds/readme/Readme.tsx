import { useState } from 'react'
import Bullhorn from '../../icons/Bullhorn'
import { NavLink } from 'react-router-dom'
import MinusIcon from '../../icons/MinusIcon'
import PlusIcon from '../../icons/PlusIcon'

const Readme = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
        <div className='flex flex-col gap-4 p-6 bg-dark-14 text-graySecondary text-sm  '>
            <div
              onClick={() => { setIsOpen(boolean => !boolean) } }
              className='w-full flex justify-between items-center group hover:text-white cursor-pointer duration-200 '
            >
                <div className='flex items-center gap-2 px-3 py-1 border group-hover:border-white  border-graySecondary  rounded-3xl'>
                    <Bullhorn />
                    <span className='uppercase  tracking-[1.12px]'>read me</span>
                </div>
                    {isOpen ? <MinusIcon /> : <PlusIcon /> }
            </div>
            {isOpen &&
                <div className='flex flex-col gap-4 leading-5 [&>p]:font-normal' >
                    <p>Wallet funds let you easily purchase items on Skinwallet Market without processing payments with every transaction. To keep the procedure safe and controllable, added funds cannot be paid back out, so take that into consideration before choosing a top-up amount.</p>
                    <p>Bear in mind that every top-up attempt counts to the monthly top-up limit.</p>
                    <p>Your top-up may require an additional KYC and/or AML verification. In such case, please follow the instructions displayed on the screen and wait for the verification process to finalize. The verification may take up to few hours.If, for any reason, your KYC procedure fails, your balance will be refunded.If, for any reason, your KYC procedure fails, your balance will be refunded.</p>
                    <p>If, for any reason, your KYC procedure fails, your balance will be refunded.</p>
                    <NavLink
                      to={'/terms-of-service'}
                      className='underline hover:no-underline'
                    >
                        Read more about Wallet in our Terms of Service
                    </NavLink>
                </div>
            }
        </div>
  )
}

export default Readme
