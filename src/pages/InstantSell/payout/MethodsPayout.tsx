import React, { useMemo, useState } from 'react'
import PaperPayout from './PaperPayout'
import { usePayoutContext } from '../../../context/PayoutContext'
import { format } from '../../../helpers/numberFormater'
import { Button } from '../../../components/Navigation'
import ExclamationStarIcon from '../../../components/icons/ExclamationStarIcon'
import { PAYOUT_METHODS } from '../../../constants/payout-methods'
import Checkbox from '../../../components/Content/Checkbox'
import ClockIcon from '../../../components/icons/ClockIcon'
import { classNames } from '../../../helpers/className'
import ExclamationTriangleFilled from '../../../components/icons/ExclamationTriangleFilled'
import { NavLink } from 'react-router-dom'
import { REGEX } from '../../../constants/regex'
import { payout } from '../../../services/payout/payout'

const MethodsPayout = () => {
  const [isAcceptedPolicy, setIsAcceptedPolicy] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSelectedMethod, setSelecteMethod] = useState<Record<string, boolean>>(PAYOUT_METHODS.reduce((acc, mth) => ({ ...acc, [mth.name]: false }), {}))

  const {
    amount,
    emailPayPal,
    inputPaypal,
    payoutMethods,
    setPayoutStep,
    setPayPalEmail,
    setInputPayPal
  } = usePayoutContext()

  const currentMethod = useMemo(() => Object.keys(isSelectedMethod).filter(key => isSelectedMethod[key]).join(), [isSelectedMethod])

  const handleSetEmail = () => {
    if (!REGEX.email.test(inputPaypal)) {
      alert('wrong format email')
      return
    }
    setPayPalEmail(inputPaypal)
    setIsEditMode(false)
  }

  const radioChange = (method: string) => {
    setSelecteMethod(prev => {
      const copy = { ...prev }
      for (const key in copy) {
        if (key === method) {
          copy[key] = !copy[key]
          continue
        }
        copy[key] = false
      }
      return copy
    })
  }
  const handleSubmit = async () => {
    const data = await payout({ amount })
    console.log(data, 'sddadas datad')
    setPayoutStep('summary')
  }
  return (
        <div className='flex flex-col items-center mx-auto max-w-[472px]  '>
            <div className='w-full flex items-center justify-between pb-4  font-medium tracking-widest text-sm text-white'>
                <div className='flex flex-col'>
                    <h6 className='uppercase'>payout amount</h6>
                    <span className='text-swLime text-22 leading-6 font-semibold'>${format(amount)}</span>
                </div>
                <div className='relative overflow-hidden hover:brightness-125 button'>
                    <Button
                        text='CHANGE'
                        onClick={() => { setPayoutStep('amount') }}
                        className='justify-center text-graySecondary font-semibold border border-graySecondary cta-clip-path '
                    />
                    <div className=' w-4 absolute -left-1 bottom-1  border-b border-graySecondary rotate-45' />
                </div>

            </div>
           <PaperPayout title='Choose payment provider'>
                <div className='flex flex-col'>
                    <div className='w-full flex items-center gap-2 px-2 py-1 text-sm text-darkSecondary font-normal bg-swLightYellow'>
                        <ExclamationStarIcon />
                        <span>0% fee for wire transfers in USD!</span>
                    </div>
                    {PAYOUT_METHODS.map((method, idx) =>
                        <React.Fragment key={method.name}>
                            {idx === 2 && amount < 50 &&
                                <div className='w-full flex items-center gap-2 px-2 py-1 text-sm text-darkSecondary font-normal bg-yellow-1e '>
                                    <ExclamationTriangleFilled />
                                    Minimum payout amount is $50.00
                                </div>}
                            <div
                                className={classNames('flex flex-col mb-2  text-swLime bg-gray-29 cta-clip-path',
                                  currentMethod === 'paypal' && currentMethod === method.name ? 'border-2 border-swLime' : '',
                                  Object.keys(payoutMethods).includes(method.name) ? '' : 'opacity-30 grayscale pointer-events-none')}
                            >
                                <div className='flex items-center justify-between p-4'>
                                    <div className='flex items-center gap-4'>
                                        <Checkbox
                                            checked={isSelectedMethod[method.name]}
                                            activeClass=''
                                            additionalClasses='bg-gray-40 border-none'
                                            onChange={() => { radioChange(method.name) }}
                                        />
                                        <img src={method.logo} alt="method-logo" />
                                    </div>

                                    <div className={classNames('flex items-center gap-4 ',
                                      idx % 3 ? 'text-graySecondary' : '')}>
                                        <ClockIcon />
                                        {method.timeline}
                                    </div>
                                </div>
                                {currentMethod === 'paypal' && idx === 1 &&
                                    <div>
                                        { !emailPayPal || isEditMode
                                          ? <div className='flex flex-col'>
                                                    <div className='relative  m-4'>
                                                        <input
                                                            type='text'
                                                            placeholder='Enter PayPal email'
                                                            value={inputPaypal}
                                                            onChange={(e) => { setInputPayPal(e.target.value) }}
                                                            className='w-full h-11 pl-4 pr-24 bg-darkGrey outline-none'
                                                        />
                                                        <Button
                                                            text='set'
                                                            onClick={handleSetEmail}
                                                            className='absolute top-0 right-0 h-full px-[32px] text-darkSecondary  cta-clip-path uppercase text-base text-swBlack bg-swLime hover cursor-pointer '
                                                        />
                                                    </div>
                                                </div>
                                          : <div className=" flex items-center justify-between pt-4 pb-8 pr-4  pl-12 text-white">
                                                <div className="flex flex-col">
                                                    <p className="text-graySecondary">PayPal email</p>
                                                    <p className="text-base">{emailPayPal}</p>

                                                </div>
                                                <div className='relative overflow-hidden hover button'>
                                                    <Button
                                                        text='edit'
                                                        onClick={() => { setIsEditMode(prev => !prev) }}
                                                        className='justify-center text-graySecondary px-[36px] font-semibold border uppercase border-graySecondary cta-clip-path '
                                                    />
                                                    <div className=' w-4 absolute -left-1 bottom-1  border-b border-graySecondary rotate-45' />
                                                </div>
                                            </div>
                                        }
                                         <div className=' flex items-center justify-between text-11 py-2 px-4 text-dark-14 bg-swLime'>
                                            <div className='flex items-center gap-2 '>
                                                <ExclamationTriangleFilled />
                                                <p>Minimum payout value: $1.00</p>
                                            </div>
                                            <p>Provider may take additional free.</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </React.Fragment>
                    )}
                    <div className='flex gap-3 items-end mt-8'>
                        <div className='text-darkSecondary ' >
                            <Checkbox checked={isAcceptedPolicy} onChange={(boolean) => { setIsAcceptedPolicy(boolean) }} />
                        </div>
                        <p className='text-sm font-normal'>
                            I agree to the {''}
                            <NavLink
                                to={''}
                                className='text-swLime underline hover:text-swLime/90'
                            >
                                Terms of Service
                            </NavLink> and {''}
                            <NavLink
                                to={''}
                                className='text-swLime underline  hover:text-swLime/90'
                            >
                                Privacy Policy
                            </NavLink>.
                        </p>
                    </div>
                    <div className='h-12 mt-4'>
                        <Button
                            text={currentMethod ? `process payout [$${format(amount)}]` : 'select a payment method'}
                            onClick={() => { void handleSubmit() }}
                            disabled={!isAcceptedPolicy}
                            className={classNames('w-full h-full flex justify-center bg-swLime text-darkSecondary cta-clip-path tracking-widest uppercase text-21 font-medium hover',
                              isAcceptedPolicy && currentMethod ? '' : 'pointer-events-none')}
                        />
                    </div>

                </div>
           </PaperPayout>
        </div>
  )
}

export default MethodsPayout
