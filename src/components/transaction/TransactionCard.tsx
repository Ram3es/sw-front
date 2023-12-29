import { useRef, useState, type FC } from 'react'
import CopyIcon from '../icons/CopyIcon'
import { classNames } from '../../helpers/className'
import Chevron from '../icons/ChevronDown'
import { format } from '../../helpers/numberFormater'
import { TRX_CARD_CONTENT } from '../../constants/transactions'
import { ETransactionType, ITransaction } from '../../types/Transactions' 
import { getTransactionStatus } from './getTransactionStatus'
import Tooltip from '../Content/Tooltip'

const TransactionCard: FC<ITransaction> = ({ transactionId, amountTransaction, amountBalance, createdAt, status, type, method }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hashRef = useRef<HTMLDivElement>(null)
  const paypalIdRef = useRef<HTMLDivElement>(null)

  const toggle = () => { setIsOpen(!isOpen) }

  const formatCustomDate = (dateString: string) => {
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

  const isDebitOperation = [ETransactionType.Payin].includes(type)

  return (
        <div className="w-full max-w-[672px] p-6 bg-darkGrey cta-clip-path relative ">
            <div className=" flex flex-col lg:grid grid-cols-4 grid-rows-2 lg:gap-y-2 " >
                <div className="order-1 lg:order-none col-span-3 flex flex-col lg:flex-row  lg:items-center text-graySecondary gap-x-2">
                    <span className="text-lg tracking-[1.12px]  uppercase  ">{TRX_CARD_CONTENT[type].title} no.</span>
                    <div className='flex items-center gap-2'>
                        <div ref={hashRef} className="text-white">{transactionId}</div>
                        <div onClick={() => { void handleCopy(hashRef) }} className=" button group relative" >
                            <CopyIcon />
                            <div className='absolute top-6 -left-4 group-hover:block hidden '>
                              <Tooltip content='Copy to clipboard' />
                            </div>
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
                        {getTransactionStatus(type, status)}
                    </div>
                    <div className=' w-full flex flex-col items-end lg:flex-row   lg:justify-between'>
                        <span className=" text-end font-normal text-graySecondary">{formatCustomDate(createdAt)}</span>
                        <div className="" >${format(amountTransaction)}</div>
                    </div>
                </div>
            </div>
            {isOpen &&
                    <div className=''>
                        <div className='flex flex-col gap-2 py-2 mb-4 px-6 text-sm [&>p]:text-white '>
                            <div>
                                <span className='text-xs leading-[14px] font-normal text-graySecondary '>Payment method</span>
                                <p className='first-letter:uppercase'>{method}</p>
                            </div>
                            {/* {!!"paypalId" && <div>
                                <span className='text-xs leading-[14px] font-normal text-graySecondary '>PayPal ID</span>
                                <div className='flex items-center gap-2'>
                                    <div ref={paypalIdRef}>{121212}</div>
                                    <div className='hover button text-graySecondary ' onClick={() => { void handleCopy(paypalIdRef) }} >
                                        <CopyIcon className='w-[11px] h-3' />
                                    </div>
                                </div>
                            </div>} */}
                        </div>
                        <div className=' absolute left-0 w-full  border border-b border-white/10' />
                        <div className='flex flex-col gap-6 sm:gap-2'>
                            <div className='grid grid-cols-4 gap-y-4 pt-6'>
                                <div className='col-span-2'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col'>
                                            <span className='flex gap-1 text-sm leading-[14px] font-normal text-graySecondary'>
                                              <span className='first-letter:uppercase'>{type}</span>
                                              Status</span>
                                            <span className='first-letter:uppercase'>{status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-2 sm:col-span-1 flex justify-center '>
                                    <div className='flex flex-col'>
                                        <span className='text-sm leading-[14px] font-normal text-graySecondary '>Wallet Funds Impact</span>
                                        <span>{isDebitOperation ? '+' : '-'}${format(amountBalance)}</span>
                                    </div>
                                </div>
                                <div className='col-span-4 sm:col-span-1 flex flex-col sm:items-end'>
                                  <span className='flex gap-1 text-sm leading-[14px] font-normal text-graySecondary '>
                                    <span className='first-letter:uppercase'>{type}</span> 
                                    Value
                                  </span>
                                  <span>${format(amountTransaction)}</span>
                                </div>
                            </div>
                            {/* <p className=' w-full sm:max-w-[40%] text-sm font-normal text-graySecondary '>{status === 'complete' ? TRNS_STRING.ps_done : TRNS_STRING.ps_pending} </p> */}
                        </div>
                    </div>
                }

        </div>
  )
}

export default TransactionCard
