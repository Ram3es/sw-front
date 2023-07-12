import { useRef, useState, type FC } from 'react'
import CopyIcon from '../icons/CopyIcon'
import { classNames } from '../../helpers/className'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { format } from '../../helpers/numberFormater'
import RoundedMark from '../icons/RoundedMark'
import ReloadIcon from '../icons/ReloadIcon'
import { TRNS_STRING } from '../../constants/strings'

interface ITransactionCardProps {
  hash: string
  amount: number
  date: string
  status: string
  paypalId: string

}

const TransactionCard: FC<ITransactionCardProps> = ({ hash, amount, date, paypalId, status }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hashRef = useRef<HTMLDivElement>(null)
  const paypalIdRef = useRef<HTMLDivElement>(null)

  const toggle = () => { setIsOpen(!isOpen) }

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
            <div className="grid grid-cols-4 grid-rows-2 gap-y-2 " >
                <div className="col-span-3 flex items-center text-graySecondary gap-2">
                    <span className="text-lg tracking-[1.12px]  uppercase ">sale no.</span>
                    <div ref={hashRef} className="text-white">{hash}</div>
                    <div onClick={() => { void handleCopy(hashRef) }} className="hover button" >
                        <CopyIcon />
                    </div>
                </div>
                <div className="flex justify-end items-center gap-2 cursor-pointer" onClick={toggle} >
                    <span className="text-sm tracking-[1.12px] text-graySecondary uppercase ">{isOpen ? 'hide details' : 'show details'}</span>
                    <div
                        className=' hover button'
                    >
                        <Chevron className={classNames('fill-graySecondary h-[12px] w-[12px]', isOpen ? 'rotate-180' : '')} />
                    </div>
                </div>
                <div className="col-span-2 " >
                    {status === 'completed'
                      ? <div className='flex items-center gap-2 text-swLime ' >
                            <RoundedMark />
                            <p>Sold - Payout of funds to PayPal</p>
                          </div>
                      : <div className='flex items-center gap-2 text-swOrange'>
                            <ReloadIcon />
                            <p>Payout of funds to PayPal</p>
                          </div>
                    }
                </div>
                <div className="flex justify-center font-normal text-graySecondary">{date}</div>
                <div className="flex justify-end" >+${format(amount)}</div>
            </div>
            {isOpen &&
                    <div className=''>
                        <div className='flex flex-col gap-2 py-2 mb-4 px-6 text-sm [&>p]:text-white '>
                            <div>
                                <span className='text-xs leading-[14px] font-normal text-graySecondary '>Payment method PayPal</span>
                                <p>PayPal</p>
                            </div>
                            <div>
                                <span className='text-xs leading-[14px] font-normal text-graySecondary '>PayPal ID</span>
                                <div className='flex items-center gap-2'>
                                    <div ref={paypalIdRef}>{paypalId}</div>
                                    <div className='hover button text-graySecondary ' onClick={() => { void handleCopy(paypalIdRef) }} >
                                        <CopyIcon className='w-[11px] h-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' absolute left-0 w-full  border border-b border-white/10' />
                        <div className='grid grid-cols-4 pt-6'>
                            <div className='col-span-2'>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col'>
                                        <span className='text-sm leading-[14px] font-normal text-graySecondary '>Payout Status</span>
                                        <span>{status === 'completed' ? 'Complete' : 'In Progress '}</span>
                                    </div>
                                    <p className=' max-w-[90%] text-sm font-normal text-graySecondary '>{status === 'completed' ? TRNS_STRING.ps_done : TRNS_STRING.ps_pending} </p>
                                </div>
                            </div>
                            <div className='flex justify-center '>
                                <div className='flex flex-col'>
                                    <span className='text-sm leading-[14px] font-normal text-graySecondary '>Wallet Funds Impact</span>
                                    <span>-${format(amount)}</span>
                                </div>
                            </div>
                            <div className='flex flex-col items-end'>
                                <span className='text-sm leading-[14px] font-normal text-graySecondary '>Payout Value</span>
                                <span>${format(amount)}</span>
                            </div>

                        </div>
                    </div>
                }

        </div>
  )
}

export default TransactionCard
