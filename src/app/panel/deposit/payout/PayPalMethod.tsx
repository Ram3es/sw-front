import { usePayoutContext } from '@/context/PayoutContext'
import PaperPayout from './PaperPayout'
import { useState } from 'react'
import { Button } from '@/components/Navigation'
import { format } from '@/helpers/numberFormater'
import { classNames } from '@/helpers/className'
import Checkbox from '@/components/Content/Checkbox'
import { PAYOUT_METHODS } from '@/constants/payout-methods'
import ClockIcon from '@/components/icons/ClockIcon'
import ExclamationTriangleFilled from '@/components/icons/ExclamationTriangleFilled'
import Link from 'next/link'

const PayPalMethod = () => {
  const { amount, emailPayPal, inputPaypal, setPayPalEmail, setPayoutStep, setInputPayPal } = usePayoutContext()
  const [isAcceptedPolicy, setIsAcceptedPolicy] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleSetEmail = () => {
    setPayPalEmail(inputPaypal)
    setIsEditMode(prev => !prev)
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
            <PaperPayout title="Choose payment provider" >
                <div className="flex flex-col gap-4">
                    <div className=" w-max font-bold text-darkSecondary bg-swLightOrange px-2 ">IMPORTANT PAYOUT ANNOUNCEMENT</div>
                    <p className="text-13 text-graySecondary font-normal">Skinwallet instant is only servicing PayPal payouts until further notice.</p>
                    <div
                        className={classNames('flex flex-col mb-2  text-swLime bg-gray-29 cta-clip-path')}
                    >
                        <div className='flex items-center justify-between p-4 pb-0'>
                            <div className='flex items-center gap-4'>
                                <Checkbox
                                    checked={true}
                                    activeClass=''
                                    additionalClasses='bg-gray-40 border-none'

                                />
                                {PAYOUT_METHODS[1]?.logo}
                            </div>

                            <div className={classNames('flex items-center gap-4 text-graySecondary ')}>
                                <ClockIcon />
                                {PAYOUT_METHODS[1].timeline}
                            </div>
                        </div>
                        {!emailPayPal || isEditMode
                          ? <div className='flex flex-col'>
                                <div className='relative  mx-4 my-6'>
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
                                        className='absolute top-0 right-0 h-full px-[32px] cta-clip-path uppercase text-base text-swBlack bg-swLime hover cursor-pointer '
                                    />
                                </div>

                                <div className=' flex items-center justify-between text-11 py-2 px-4 text-dark-14 bg-swLime'>
                                    <div className='flex items-center gap-2 '>
                                        <ExclamationTriangleFilled />
                                        <p>Minimum payout value: $1.00</p>
                                    </div>
                                    <p>Provider may take additional free.</p>
                                </div>
                            </div>
                          : <div className="flex items-center justify-between pt-4 pb-8 px-6 sm:px-0 sm:pr-4 sm:pl-12 text-white">
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
                    </div>
                    <div className='flex gap-3 items-end mt-8'>
                        <div className='text-darkSecondary ' >
                            <Checkbox checked={isAcceptedPolicy} onChange={(boolean) => { setIsAcceptedPolicy(boolean) }} />
                        </div>
                        <p className='text-sm font-normal'>
                            I agree to the {''}
                            <Link
                                href={''}
                                className='text-swLime underline hover:text-swLime/90'
                            >
                                Terms of Service
                            </Link> and {''}
                            <Link
                                href={''}
                                className='text-swLime underline  hover:text-swLime/90'
                            >
                                Privacy Policy
                            </Link>.
                        </p>
                    </div>
                    <div className='h-12 mt-4'>
                        <Button
                            text={`process payout [$${format(amount)}]`}
                            onClick={() => { setPayoutStep('summary') }}
                            disabled={!isAcceptedPolicy}
                            className={classNames('w-full h-full flex justify-center bg-swLime text-darkSecondary cta-clip-path tracking-widest uppercase text-21 font-medium hover',
                              isAcceptedPolicy ? '' : 'pointer-events-none')}
                        />
                    </div>
                </div>
            </PaperPayout>
        </div>
  )
}

export default PayPalMethod
