import { useRef, useState, type FC } from 'react'
import CopyIcon from '../icons/CopyIcon'
import { classNames } from '../../helpers/className'
import Chevron from '../icons/ChevronDown'
import { format } from '../../helpers/numberFormater'
import RoundedMark from '../icons/RoundedMark'
import ReloadIcon from '../icons/ReloadIcon'
import { TRNS_STRING } from '../../constants/strings'
import { type TransactionItem } from '../../types/Transactions'

const TransactionCard: FC<TransactionItem> = ({ hash, amount, date, paypalId, status }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hashRef = useRef<HTMLDivElement>(null)
  const paypalIdRef = useRef<HTMLDivElement>(null)

  const toggle = () => { setIsOpen(!isOpen) }

  const formatCustomDate = (dateString: Date) => {
    // Convert the dateString to a Date object
    const dateObject = new Date(dateString)

    // Extract the date and time components
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0') // Months are 0-based
    const year = dateObject.getFullYear().toString()
    const hours = dateObject.getHours().toString().padStart(2, '0')
    const minutes = dateObject.getMinutes().toString().padStart(2, '0')

    // Construct the formatted date string
    const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`

    return formattedDate
  }
  const handleCopy = async (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      try {
        await navigator.clipboard.writeText(ref.current.innerHTML)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
        <div className="w-full max-w-[672px] p-6 bg-darkGrey cta-clip-path relative ">
            <div className=" flex flex-col lg:grid grid-cols-4 grid-rows-2 lg:gap-y-2 " >
                <div className="order-1 lg:order-none col-span-3 flex flex-col lg:flex-row  lg:items-center text-graySecondary gap-x-2">
                    <span className="text-lg tracking-[1.12px]  uppercase  ">sale no.</span>
                    <div className='flex items-center gap-2'>
                        <div ref={hashRef} className="text-white">{hash}</div>
                        <div onClick={() => { void handleCopy(hashRef) }} className="hover button" >
                            <CopyIcon />
                        </div>
                    </div>
                </div>
                <div className=" flex justify-end items-center gap-2 cursor-pointer" onClick={toggle} >
                    <span className="text-sm tracking-[1.12px] text-graySecondary uppercase ">{isOpen ? 'hide details' : 'show details'}</span>
                    <div
                        className=' hover button'
                    >
                        <Chevron className={classNames('fill-graySecondary h-[12px] w-[12px]', isOpen ? 'rotate-180' : '')} />
                    </div>
                </div>
                <div className=' order-2 mt-4 lg:mt-0 lg:order-none col-span-4 flex lg:items-center justify-between  '>
                    <div className=" w-full mr-2" >
                        {status === 'completed'
                          ? <div className='flex items-start gap-2 text-swLime ' >
                                <RoundedMark className='shrink-0' />
                                <p className='leading-4'>Sold - Payout of funds to PayPal</p>
                            </div>
                          : <div className='flex items-start gap-2 text-swOrange'>
                                <ReloadIcon className='shrink-0 ' />
                                <p className='leading-4'>Payout of funds to PayPal</p>
                            </div>
                        }
                    </div>
                    <div className=' w-full flex flex-col items-end lg:flex-row   lg:justify-between'>
                        <span className=" text-end font-normal text-graySecondary">{formatCustomDate(date)}</span>
                        <div className="" >+${format(amount)}</div>
                    </div>
                </div>
            </div>
            {isOpen &&
                    <div className=''>
                        <div className='flex flex-col gap-2 py-2 mb-4 px-6 text-sm [&>p]:text-white '>
                            <div>
                                <span className='text-xs leading-[14px] font-normal text-graySecondary '>Payment method PayPal</span>
                                <p>PayPal</p>
                            </div>
                            {paypalId && <div>
                                <span className='text-xs leading-[14px] font-normal text-graySecondary '>PayPal ID</span>
                                <div className='flex items-center gap-2'>
                                    <div ref={paypalIdRef}>{paypalId}</div>
                                    <div className='hover button text-graySecondary ' onClick={() => { void handleCopy(paypalIdRef) }} >
                                        <CopyIcon className='w-[11px] h-3' />
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className=' absolute left-0 w-full  border border-b border-white/10' />
                        <div className='flex flex-col gap-6 sm:gap-2'>
                            <div className='grid grid-cols-4 gap-y-4 pt-6'>
                                <div className='col-span-2'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col'>
                                            <span className='text-sm leading-[14px] font-normal text-graySecondary '>Payout Status</span>
                                            <span>{status === 'completed' ? 'Complete' : 'In Progress '}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-2 sm:col-span-1 flex justify-center '>
                                    <div className='flex flex-col'>
                                        <span className='text-sm leading-[14px] font-normal text-graySecondary '>Wallet Funds Impact</span>
                                        <span>-${format(amount)}</span>
                                    </div>
                                </div>
                                <div className='col-span-4 sm:col-span-1 flex flex-col sm:items-end'>
                                    <span className='text-sm leading-[14px] font-normal text-graySecondary '>Payout Value</span>
                                    <span>${format(amount)}</span>
                                </div>
                            </div>
                            <p className=' w-full sm:max-w-[40%] text-sm font-normal text-graySecondary '>{status === 'completed' ? TRNS_STRING.ps_done : TRNS_STRING.ps_pending} </p>
                        </div>
                    </div>
                }

        </div>
  )
}

export default TransactionCard
