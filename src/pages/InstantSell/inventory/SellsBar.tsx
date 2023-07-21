import { type ChangeEvent, type FC, useState } from 'react'
import { Button } from '../../../components/Navigation'
import Checkbox from '../../../components/Content/Checkbox'
import { NavLink } from 'react-router-dom'
import { classNames } from '../../../helpers/className'
import SymbolIcon from './SymbolIcon'
import { type TInventoryCard } from '../../../types/Card'
import InformationIcon from '../../../components/icons/InformationIcon'
import ItemSelectedCard from '../../../components/Content/ItemSelectedCard'
import { format } from '../../../helpers/numberFormater'
import { useHideOnScroll } from '../../../helpers/useHideOnScroll'

interface ISellBarProps {
  selectedCards: TInventoryCard[]
  onClose: (card: TInventoryCard) => void
}

const SellsBar: FC<ISellBarProps> = ({ selectedCards, onClose }) => {
  const [inputValue, setInputValue] = useState('')
  const [isAcceptedPolicy, setIsAcceptedPolicy] = useState(false)
  const shouldHide = useHideOnScroll()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const totalWorth = selectedCards.reduce((acc, val) => acc + val.price, 0)
  return (
        <div className={classNames('sticky flex flex-col max-w-[429px] w-full gap-6 p-8 text-skinwallerGray font-Barlow side-bar-gradient cta-clip-path duration-100', shouldHide ? ' max-h-[calc(100vh-60px)]  top-[60px]' : ' max-h-[calc(100vh-120px)] top-[120px]')}>
            <div className='relative'>
                <input
                    type='text'
                    placeholder='Enter coupon code'
                    value={inputValue}
                    onChange={handleChange}
                    className='w-full h-11 pl-4 pr-24 bg-darkGrey outline-none'
                />
                <Button
                    text='Redeem'
                    onClick={() => { console.log('submit') }}
                    className='absolute top-0 right-0 h-full text-base font-medium text-darkGrey bg-skinwalletPink/50 hover:bg-skinwalletPink/80 uppercase cursor-pointer cta-clip-path '
                />
            </div>
            <div className='flex-grow flex flex-col '>
                <div className='flex items-center justify-between font-medium'>
                    <h5 className='text-lg uppercase tracking-widest'>Selection overview</h5>
                    <div className='flex items-center gap-2'>
                        {selectedCards.length}/100
                        <InformationIcon iconClasses='w-4 h-4' />
                    </div>
                </div>
                <div className=' relative flex flex-col flex-grow show-scrollbar overflow-y-auto gap-y-3  py-2'>
                    {selectedCards.length
                      ? (
                          selectedCards.map(card => <ItemSelectedCard key={card.id} onClick={() => { onClose(card) }} {...card} />)
                        )
                      : (
                            <div className='flex flex-col items-center my-auto font-medium gap-4'>
                                <SymbolIcon />
                                <p>Select items from your inventory.</p>
                                <p className='text-center max-w-[230px]'>You can choose up to 100 items per single transaction</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className=' border-b border-white/10 mt-6' />
            <div className='flex justify-between items-center text-sm font-medium'>
                <h6 className='text-white tracking-widest uppercase'>$50 to next bonus tier</h6>
                <div className='flex items-center gap-2 tracking-widest'>
                    <div className='w-[60px] h-1 bg-[#424242] relative'>
                        <div
                            className='absolute inset-0 bg-[#6842FF]'
                            style={{ width: `${20}%` }}
                        />
                    </div>
                    +{1}%
                </div>
            </div>
            <div className=' border-b border-white/10' />
            <div className='flex gap-3 items-end '>
                <div className='text-swViolet ' >
                    <Checkbox checked={isAcceptedPolicy} onChange={(boolean) => { setIsAcceptedPolicy(boolean) }} />
                </div>
                <p className='text-sm font-normal'>
                    I agree to the {''}
                    <NavLink
                        to={''}
                        className='text-skinwalletPink underline hover:text-skinwalletPink/90'
                    >
                        Terms of Service
                    </NavLink> and {''}
                    <NavLink
                        to={''}
                        className='text-skinwalletPink underline  hover:text-skinwalletPink/90'
                    >
                        Privacy Policy
                    </NavLink>.
                </p>
            </div>
            <div className='h-12 relative overflow-hidden'>
                <Button
                    text={`GET $${format(totalWorth)}`}
                    onClick={() => { console.log('sell') }}
                    className={classNames('w-full h-full min-h-[48px] flex justify-center text-21  tracking-widest text-white font-medium bg-swViolet/40 cta-clip-path border border-b-[3px] border-swViolet  ',
                      isAcceptedPolicy ? 'hover:opacity-90' : ' grayscale',
                      selectedCards.length ? '' : 'pointer-events-none'

                    )}
                    disabled={!isAcceptedPolicy}
                />
                <div className={classNames('absolute -left-1 bottom-1 h-[1px] w-4 bg-swViolet rotate-45', isAcceptedPolicy ? '' : ' grayscale')} />
            </div>
        </div>
  )
}

export default SellsBar
