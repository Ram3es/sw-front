import { type FC, useMemo } from 'react'
import { format, percentageDecrease } from '../../helpers/numberFormater'
import { type IItemSelectedCard } from '../../types/Card'
import TrashBin from '../icons/TrashBin'
import { CONDITIONS } from '../../constants/item-conditions'
import { classNames } from '../../helpers/className'
import SteamIcon from '../icons/SteamIcon'
import { findNearestMaxValue } from '@/helpers/findNearestMaxValue'

const ItemSelectedCard: FC<IItemSelectedCard> = ({ image, price, steamPrice, condition, name, variant, onClick, isBorderBottom = true }) => {
  const [type, modification] = name.split('|')
  // .split(/[ -]+/)

  const { color, shortName } = useMemo(() => {
    const idx = CONDITIONS.findIndex((el) => condition <= el.maxVal)
    const currentCondition = CONDITIONS[idx]
    const shortName = currentCondition?.text.split(/[ -]+/).map(str => str.slice(0, 1).toUpperCase())
    return {
      color: currentCondition?.color,
      shortName
    }
  }, [condition])

  const conditionObj = findNearestMaxValue(CONDITIONS, condition)

  return (
        <div className={classNames('relative h-44 shrink-0 overflow-hidden group ',
          variant ?? '',
          isBorderBottom ? 'border-b border-white/10' : '')}>
            <span
                className="absolute left-[15%] top-[40%] h-0 w-[13%]  "
                style={{
                  boxShadow: 'rgba(255, 255, 255, 0.7) 0px 0px 45px 10px'
                }}
            />
            <div className='w-full h-full flex text-sm font-medium font-Barlow relative '>
                <div className='w-[40%]  h-full  '>
                    <img src={image} alt={name} className='group-[.offer]:w-[180px] mx-auto' />
                </div>
                <div className='w-[60%] flex flex-col gap-2 p-2'>
                    <span className='uppercase'>{type}</span>
                    <h4 className='text-white text-lg group-[.offer]:text-2xl'>{modification}</h4>
                    <div className='flex flex-row group-[.withdraw]/card:hidden font-Barlow font-bold'>
                        <span className='text-2xl text-white group-[.offer]:hidden mr-3'>${format(price ?? 0)}</span>
                        {steamPrice && price ? <div className='bg-swLime text-black h-6 px-1'>{percentageDecrease(steamPrice, price)}%</div> : ''}
                    </div>

                    { steamPrice ? (
                        <div className='flex flex-row group-[.market]/card:flex group-[.withdraw]/card:flex items-center gap-2 pb-1 text-sm text-graySecondary'>
                            <SteamIcon className='w-4 h-auto'/>
                            <span>${format(steamPrice)}</span>
                        </div>) : null}
                    <div className='hidden  group-[.offer]:block'>
                        <div className='w-3/5 border-t border-white/10'>
                            <div className=' w-1/5 border-t border-white/10 p-1'/>
                        </div>
                        <span className='font-normal capitalize'>Classified {'pistol'}</span>
                    </div>
                    {condition ? <div
                        className='flex gap-2 items-center'
                        style={{ color }}
                        >
                        <div
                            className='border text-xs px-1'
                            style={{ borderColor: `${color}` }}
                        >{conditionObj?.shortText}</div>
                        <span className='font-normal normal-case'>{condition.toFixed(3)} wear</span>
                    </div>  : ''}
                </div>
            </div>
            {onClick ? 
            (<div
                className='absolute h-4 w-4 right-2 top-2 text-graySecondary group button group-[.offer]:hidden'
                onClick={onClick}
            >
                <TrashBin iconClasses='group-hover:text-graySecondary/80' />
            </div>) : null
            }
        </div>
  )
}

export default ItemSelectedCard
