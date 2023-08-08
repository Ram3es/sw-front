import { type FC, useMemo } from 'react'
import { format } from '../../helpers/numberFormater'
import { type IItemSelectedCard } from '../../types/Card'
import TrashBin from '../icons/TrashBin'
import { CONDITIONS } from '../../constants/item-conditions'
import { classNames } from '../../helpers/className'

const ItemSelectedCard: FC<IItemSelectedCard> = ({ image, price, condition, name, variant, onClick }) => {
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

  return (
        <div className={classNames('relative h-40 shrink-0 border-b border-white/10 overflow-hidden group ',
          variant ?? '')}>
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
                    <span className='text-2xl text-white group-[.offer]:hidden '>${format(price ?? 0)}</span>
                    <div className='hidden  group-[.offer]:block'>
                        <div className='w-3/5 border-t border-white/10'>
                            <div className=' w-1/5 border-t border-white/10 p-1'/>
                        </div>
                        <span className='font-normal capitalize'>Classified {'pistol'}</span>
                    </div>
                    <div
                        className='flex gap-2 items-center'
                        style={{ color }}
                        >
                        <div
                            className='border text-xs px-1'
                            style={{ borderColor: `${color}` }}
                        >{shortName}</div>
                        <span className='font-normal'>{condition} wear</span>
                    </div>
                </div>
            </div>
            <div
                className='absolute h-4 w-4 right-2 top-2 text-graySecondary group button group-[.offer]:hidden'
                onClick={onClick}
            >
                <TrashBin iconClasses='group-hover:text-graySecondary/80' />
            </div>
        </div>
  )
}

export default ItemSelectedCard
