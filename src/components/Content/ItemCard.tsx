import { CONDITIONS } from '../../constants/item-conditions'
import { type CardItem, type ConditionItem } from '../../types/Card'
import { Button } from '../Navigation'
import Checkbox from './Checkbox'
import { ReactComponent as ClockIcon } from './images/clock.svg'

function findNearestMaxValue (arr: ConditionItem[], value: number): ConditionItem | null {
  let nearestMaxValue: ConditionItem | null = null

  for (let i = 0; i < arr.length; i++) {
    const maxVal: number = arr[i].maxVal

    if (value < maxVal) {
      nearestMaxValue = arr[i]
      break
    }
  }

  return nearestMaxValue
}

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ItemCard = ({ isTradable, timeToTrade, image, isSelected, isNoFee, price, name, type, condition, onClick }: CardItem) => {
  const conditionObj = findNearestMaxValue(CONDITIONS, condition)

  return (
    <div className={classNames('relative',
      isTradable && !isSelected ? 'group hover:-translate-y-4 hover:z-20 duration-75' : '',
      isSelected ? 'shadow-checkedCard' : ''
    )}>
      <div
        className={classNames('absolute left-0 top-0 w-full h-full border border-b-[3px] group-hover:border-0 group-hover:bg-darkGrey card-clip-path',
          isSelected ? 'border-swViolet' : 'border-darkGrey'
        )}
      >
        <span className={classNames('absolute group-hover:hidden -right-[2px] top-[3px] w-[10px] rotate-45',
          isSelected ? 'border-swViolet border-t-2' : 'border-t border-darkGrey'
        )} />
        <span className={classNames('absolute group-hover:hidden -left-[2px] bottom-[1px] w-[10px] rotate-45',
          isSelected ? 'border-swViolet border-t-2' : 'border-t border-darkGrey'
        )} />
      </div>
      {!isTradable
        ? <div className="bg-darkSecondary bg-opacity-50 absolute left-0 top-0 w-full h-full z-20">
        <span
          className="absolute left-1/2 -translate-x-1/2 top-[84px] uppercase flex w-max text-14 font-['Barlow'] text-white py-1 px-3 border rounded-[24px]"
        >
          trade locked
        </span>
      </div>
        : ''}
      <div
        className={classNames('relative min-h-[200px] cursor-pointer overflow-hidden h-full', !isTradable ? 'grayscale' : '')}
        onClick={() => { onClick() }}
      >
        <span
          className="absolute left-1/2 -translate-x-1/2 top-24 h-0 w-1/2"
          style={{
            boxShadow: 'rgba(255, 255, 255, 0.7) 0px 0px 55px 13px'
          }}
        />
        <div className="p-4 pb-6 relative z-10 flex flex-col justify-between items-center w-full h-full">
          <div
            className="flex w-full justify-between"
          >
            <div className={classNames('flex items-center gap-2 uppercase text-xs font-["Barlow"]',
              isTradable && !timeToTrade ? 'text-[#18E86B]' : '',
              isTradable && timeToTrade ? 'text-[#FF8F27]' : '',
              !isTradable ? 'text-white' : ''
            )}>
              <ClockIcon />
              {isTradable && !timeToTrade
                ? <span>Tradable</span>
                : <span>{timeToTrade && timeToTrade > 24
                  ? `${(timeToTrade / 24).toFixed()} days`
                  : timeToTrade ? `${timeToTrade} hours` : "Can't trade"}
                </span>}
            </div>
            <div className='text-swViolet'>
              <Checkbox
                checked={isSelected}
              />
            </div>
          </div>
          <img
            className="h-[137px]"
            src={image}
            alt={name}
          />
          <div className="flex flex-col w-full relative mb-2">
            <div className='text-graySecondary uppercase text-sm font-["Barlow"] font-light'>estimated value</div>
            <div className='text-whote uppercase text-2xl font-["Barlow"] text-white font-bold'>{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            {isNoFee
              ? <span className="px-1 absolute bottom-[110%] left-0 bg-[#FFD7BC] text-darkSecondary text-xs font-['Barlow']">
              0% Fee
            </span>
              : ''}
          </div>
          <div className="flex flex-col w-full relative mb-2">
            <div className='text-graySecondary uppercase text-sm font-["Barlow"] font-light'>{type}</div>
            <div className='text-whote uppercase text-lg font-["Barlow"] text-white'>{name}</div>
          </div>
          <span className="w-full border-t border-darkGrey" />
          <div className="flex flex-col gap-[14px] w-full">
            <div style={{
              color: conditionObj?.color ?? ''
            }}>{conditionObj?.text} - {condition}</div>
            <div className="relative w-full flex h-1">
              <div className="w-[7%] h-full bg-[#18E86B]"/>
              <div className="w-[8%] h-full bg-[#3DB26E]"/>
              <div className="w-[22%] h-full bg-[#FACB53]"/>
              <div className="w-[7%] h-full bg-[#97602D]"/>
              <div className="w-auto grow h-full bg-[#424242]"/>
              <span
                className="absolute -top-1 w-[2px] h-3 bg-white"
                style={{
                  left: `${condition * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        className='justify-center z-10 hidden group-hover:flex absolute left-0 top-full mr-[20px] text-base w-full h-10 uppercase font-semibold text-darkSecondary border border-skinwalletPink bg-skinwalletPink cta-clip-path role-button'
        text="add to sale"
      />
    </div>
  )
}

export default ItemCard
