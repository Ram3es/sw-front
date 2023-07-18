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
import InputWithBtn from '../../../components/Content/InputWithBtn'

type TMethodState = Record<string, { isSelected: boolean, methodAccount: string }>

const MethodsPayout = () => {
  const [isAcceptedPolicy, setIsAcceptedPolicy] = useState(false)
  const [methodsState, setSelecteMethod] = useState<TMethodState>(
    PAYOUT_METHODS.reduce((acc, method) =>
      ({ ...acc, [method.name]: { isSelected: false, methodAccount: '' } }), {})
  )
  const {
    amount,
    avalableMethods,
    setPayoutStep
  } = usePayoutContext()

  const currentMethod = useMemo(() => Object.keys(methodsState).filter(key => methodsState[key].isSelected).join(), [methodsState])

  const handleSetMethodRequirments = (method: string, inputValue: string) => {
    switch (method) {
      case 'venmo':
        if (!REGEX.phoneOrName.test(inputValue)) {
          alert('enter valid name or number')
          return
        }
        break
      case 'paypal':
        if (!REGEX.email.test(inputValue)) {
          alert('wrong format email')
          return
        }
    }
    setSelecteMethod(prev => ({
      ...prev,
      [method]: { ...prev[method], methodAccount: inputValue }
    }))
  }

  const radioChange = (method: string) => {
    setSelecteMethod(prev => {
      const copy = { ...prev }
      for (const key in copy) {
        if (key === method) {
          copy[key] = { ...copy[key], isSelected: !copy[key].isSelected }
          continue
        }
        copy[key] = { ...copy[key], isSelected: false }
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
                                  currentMethod === method.name ? 'border-2 border-swLime' : '',
                                  Object.keys(avalableMethods).includes(method.name) ? '' : 'opacity-30 grayscale pointer-events-none')}
                            >
                                <div className='flex items-center justify-between p-4'>
                                    <div
                                      className='flex items-center gap-4 cursor-pointer'
                                      onClick={() => { radioChange(method.name) }}
                                    >
                                        <Checkbox
                                            checked={methodsState[method.name].isSelected}
                                            activeClass=''
                                            additionalClasses='bg-gray-40 border-none pointer-events-none'
                                        />
                                        <img src={method.logo} alt="method-logo" />
                                    </div>

                                    <div className={classNames('flex items-center gap-4 ',
                                      idx % 3 ? 'text-graySecondary' : '')}>
                                        <ClockIcon />
                                        {method.timeline}
                                    </div>
                                </div>
                                {currentMethod === method.name &&
                                    <div>
                                        { !methodsState[method.name].methodAccount
                                          ? <div className='flex flex-col'>
                                            <InputWithBtn
                                              placeholder={method.placeholder}
                                              submitFn={(inputValue: string) => { handleSetMethodRequirments(method.name, inputValue) }} />
                                            </div>
                                          : <div className=" flex items-center justify-between pt-4 pb-8 pr-4  pl-12 text-white">
                                                <div className="flex flex-col">
                                                    <p className="text-graySecondary">{method.methodTitle}</p>
                                                    <p className="text-base">{methodsState[method.name].methodAccount}</p>

                                                </div>
                                                <div className='relative overflow-hidden hover button'>
                                                    <Button
                                                        text='edit'
                                                        onClick={() => {
                                                          setSelecteMethod(prev => ({
                                                            ...prev,
                                                            [method.name]: { ...prev[method.name], methodAccount: '' }
                                                          }))
                                                        }}
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
