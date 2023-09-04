
import { type IItemSelectedCard } from '../../types/Card'
import { Button } from '../Navigation'
import InformationIcon from '../icons/InformationIcon'
import Dropbox from './Dropbox'
import { format as formatDate } from 'date-fns'
import ItemSelectedCard from './ItemSelectedCard'
import RoundedMark from '../icons/RoundedMark'
import ExclamationTriangleIcon from '../icons/ExclamationTriangle'
import PaperPlane from '@/components/icons/PaperPlane'
import { useEffect, useRef, useState } from 'react'

interface ITradeOfferCardProps {
  status?: string
  botName: string
  token: string
  createdAt: Date
  expiredAt: Date
  items: IItemSelectedCard[]
}

const TradeOfferCard = ({ status = 'pending', botName, items, token, createdAt, expiredAt }: ITradeOfferCardProps) => {
  const [timer, setTimer] = useState<number>(600000)
  const refInterval = useRef<ReturnType< typeof setInterval>>()

  useEffect(() => {
    console.log('expiredAt', expiredAt)
    refInterval.current && clearInterval(refInterval.current)
    if (status === 'pending') {
      refInterval.current = setInterval(() => { setTimer(prev => prev - 1000) }, 1000)
    }
    return () => { clearInterval(refInterval.current) }
  }, [timer])

  // useEffect(() => {
  //   if (status === 'pending') {
  //     const now = Date.now()
  //     const expired = new Date(expiredAt)
  //     const leftMilliseconds = expired.getTime() - now
  //     // console.log(now)
  //     console.log(expiredAt)

  //     setTimer(leftMilliseconds)
  //   }
  // }, [])

  const getOfferStatus = (status: string) => {
    switch (status) {
      case 'created':
        return (
          <Button
            text='send'
            onClick={() => {}}
            className='text-darkSecondary bg-skinwalletPink uppercase hover:opacity-70 cta-clip-path'
            heightClass='h-10'
          />)
      case 'pending':
        return (
          <div className='flex flex-col sm:flex-row justify-between'>
            <div className='flex flex-col sm:flex-row gap-4 mb-4 md:mb-0'>
              <Button
                text='accept in steam'
                className='w-full sm:w-max justify-center bg-skinwalletPink text-darkSecondary uppercase hover:opacity-70 cta-clip-path '
                heightClass='h-10'
              />
              <Button
                text='accept in browser'
                className='w-full sm:w-max justify-center text-graySecondary border border-graySecondary uppercase relative group hover:text-white hover:border-white cta-clip-path '
                heightClass='h-10'
              >
                <span className='absolute -left-[3px] bottom-[3px] border-t border-graySecondary group-hover:border-white duration-200 rotate-45 w-3 '/>
              </Button>
            </div>
            <span className='text-2xl text-white text-center md:text-start uppercase font-semibold tracking-[1.2px] '>{formatDate(new Date(timer), 'mm:ss ')}</span>
          </div>)
      case 'accepted':
        return (
          <div className='flex items-center gap-2 text-swLime'>
            <RoundedMark className=' w-[18px] h-auto shrink-0 ' />
            <span>Trade Offer accepted</span>
          </div>)
      case 'declined':
        return (
          <div className='flex flex-col sm:flex-row sm:items-center gap-y-4 text-swRed'>
            <div className='flex items-center gap-2'>
              <ExclamationTriangleIcon className=' w-[18px] h-auto shrink-0' />
              <span >Trade Offer has expired or has been declined</span>
            </div>
            <div className=' flex items-center gap-2 ml-auto text-graySecondary hover:text-white duration-200 cursor-pointer'>
              <PaperPlane />
              <span className='text-sm uppercase tracking-[1.12px]'>resend</span>
            </div>
          </div>)
    }
  }
  return (
        <div className='  w-full flex flex-col p-6 bg-darkGrey text-graySecondary  corner-lb-clip-4' >
          <Dropbox
            label={(isOpen) => (
              <div className='w-full flex justify-between mr-2'>
                <span className=''>{items.length} {items.length > 1 ? 'items' : 'item' }</span>
                <span className='uppercase tracking-[1.12px]'>{isOpen ? 'hide items' : 'show items'}</span>
              </div>)}
            additionalClasses='w-full flex items-center text-sm text-graySecondary group hover:text-white duration-200 [&_.label-wrap]:w-full'
          >
            <div className='w-full mt-6'>
              <div className='flex flex-col gap-2'>
                {items.map(card =>
                  <ItemSelectedCard
                    key={card.id}
                    variant='offer'
                    {...card}
                     />)}
              </div>
            </div>
          </Dropbox>
          <div className='w-full border border-b border-white/10 my-6'/>
          <h2 className='uppercase text-lg tracking-[1.44px] small-caps mb-4'>trade offer details</h2>
          <div className='flex flex-col md:flex-row justify-between items-start '>
            <div className='flex items-center gap-2 mb-2 md:mb-0'>
              <span className='text-white'>Skinwallet Bot {botName}</span>
              <InformationIcon iconClasses='w-[14px]  h-auto' />
            </div>
            <div className='flex flex-col md:items-end [&_span]:text-white'>
              <div className='flex gap-1'> On Steam since:<span>{formatDate(new Date(createdAt), 'MMMM d, yyyy')}</span></div>
              <div className='flex gap-1'> Security token:<span className='w-20 truncate'>{token}</span></div>
            </div>
          </div>
          <div className='mt-10'>
            {getOfferStatus('pending')}
          </div>
        </div>
  )
}

export default TradeOfferCard
