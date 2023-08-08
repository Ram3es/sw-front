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
  const [isOpen, setIsOpen] = useState(false)
  const shouldHide = useHideOnScroll()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const totalWorth = selectedCards.reduce((acc, val) => acc + val.price, 0)
  return (
    <div
      className={classNames(
        ' fixed left-0 z-30 md:sticky flex flex-col max-w-[429px] w-full gap-6 p-8 text-skinwallerGray font-Barlow bg-sideBarGradientSmall md:bg-sideBarGradient md:[clip-path:polygon(100%_0,100%_100%,calc(0%+8px)_100%,0_calc(100%-8px),0_0)] duration-100',
        shouldHide
          ? ' h-max md:h-screen max-h-[calc(90vh-60px)] md:max-h-[calc(100vh-60px)] bottom-0 md:top-[60px]'
          : ' h-max md:h-screen max-h-[calc(90vh-120px)] md:max-h-[calc(100vh-120px)] bottom-0 md:top-[120px]'
      )}
    >
      <div className='absolute -top-[18px] left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex md:hidden justify-center items-center bg-darkGrey'>
        <svg onClick={() => { setIsOpen(prev => !prev) }} className={classNames(isOpen ? '' : 'rotate-180')} width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_954_9868)">
          <path d="M11.3393 9.52087L11.0391 9.17779C10.8247 9.00625 10.5245 9.00625 10.3101 9.17779L6.75061 12.7801L6.75061 1.74387C6.75061 1.44367 6.4933 1.22925 6.23599 1.22925L5.80714 1.22925C5.50694 1.22925 5.29252 1.44367 5.29252 1.74387L5.29252 12.7801L1.69018 9.17779C1.47575 9.00625 1.17556 9.00625 0.961135 9.17779L0.66094 9.52087C0.446515 9.69241 0.446515 10.0355 0.66094 10.2499L5.6356 15.2246C5.85002 15.439 6.15022 15.439 6.36464 15.2246L11.3393 10.2499C11.5537 10.0355 11.5537 9.69241 11.3393 9.52087Z" fill="#A4A4A4"/>
          </g>
          <defs>
          <clipPath id="clip0_954_9868">
          <rect width="11" height="15.4" fill="white" transform="translate(11.5001 16.1641) rotate(-180)"/>
          </clipPath>
          </defs>
        </svg>
      </div>
      <div className={classNames('relative',
        isOpen ? 'block' : 'hidden md:block')}
      >
        <input
          type="text"
          placeholder="Enter coupon code"
          value={inputValue}
          onChange={handleChange}
          className="w-full h-11 pl-4 pr-24 bg-darkGrey outline-none"
        />
        <Button
          text="Redeem"
          onClick={() => {
            console.log('submit')
          }}
          className="absolute top-0 right-0 h-full text-base font-medium text-darkGrey bg-skinwalletPink/50 hover:bg-skinwalletPink/80 uppercase cursor-pointer cta-clip-path "
        />
      </div>
      <div className="flex-grow flex flex-col overflow-hidden max-h-64 md:max-h-none h-1/2">
        <div className="flex items-center justify-between font-medium">
          <h5 className="text-lg uppercase tracking-widest">
            Selection overview
          </h5>
          <div className="flex items-center gap-2">
            {selectedCards.length}/100
            <InformationIcon iconClasses="w-4 h-4" />
          </div>
        </div>
        <div className={classNames('relative flex-col flex-grow show-scrollbar overflow-y-auto gap-y-3  py-2',
          isOpen ? 'flex' : 'hidden md:flex')}
        >
          {selectedCards.length
            ? (
                selectedCards.map((card) => (
              <ItemSelectedCard
                key={card.id}
                onClick={() => {
                  onClose(card)
                }}
                {...card}
              />
                ))
              )
            : (
            <div className="flex flex-col items-center my-auto font-medium gap-4">
              <SymbolIcon />
              <p>Select items from your inventory.</p>
              <p className="text-center max-w-[230px]">
                You can choose up to 100 items per single transaction
              </p>
            </div>
              )}
        </div>
      </div>
      <div className={classNames('border-b border-white/10 mt-6', isOpen ? 'block' : 'hidden md:block')} />
      <div className={classNames('justify-between items-center text-sm font-medium', isOpen ? 'flex' : 'hidden md:flex')}>
        <h6 className="text-white tracking-widest uppercase">
          $50 to next bonus tier
        </h6>
        <div className="flex items-center gap-2 tracking-widest">
          <div className="w-[60px] h-1 bg-[#424242] relative">
            <div
              className="absolute inset-0 bg-[#6842FF]"
              style={{ width: `${20}%` }}
            />
          </div>
          +{1}%
        </div>
      </div>
      <div className={classNames('border-b border-white/10 mt-6', isOpen ? 'block' : 'hidden md:block')} />
      <div className={classNames('flex gap-3 items-end', isOpen ? 'flex' : 'hidden md:flex')}>
        <div className="text-swViolet ">
          <Checkbox
            checked={isAcceptedPolicy}
            onChange={(boolean) => {
              setIsAcceptedPolicy(boolean)
            }}
          />
        </div>
        <p className="text-sm font-normal">
          I agree to the {''}
          <NavLink
            to={''}
            className="text-skinwalletPink underline hover:text-skinwalletPink/90"
          >
            Terms of Service
          </NavLink>{' '}
          and {''}
          <NavLink
            to={''}
            className="text-skinwalletPink underline  hover:text-skinwalletPink/90"
          >
            Privacy Policy
          </NavLink>
          .
        </p>
      </div>
      <div className="min-h-12 relative overflow-hidden">
        <Button
          text={`GET $${format(totalWorth)}`}
          onClick={() => {
            console.log('sell')
          }}
          className={classNames(
            'w-full h-full min-h-[48px] flex justify-center text-21  tracking-widest text-white font-medium bg-swViolet/40 cta-clip-path border border-b-[3px] border-swViolet  ',
            isAcceptedPolicy ? 'hover:opacity-90' : ' grayscale',
            selectedCards.length ? '' : 'pointer-events-none'
          )}
          disabled={!isAcceptedPolicy}
        />
        <div
          className={classNames(
            'absolute -left-1 bottom-1 h-[1px] w-4 bg-swViolet rotate-45',
            isAcceptedPolicy ? '' : ' grayscale'
          )}
        />
      </div>
    </div>
  )
}

export default SellsBar
