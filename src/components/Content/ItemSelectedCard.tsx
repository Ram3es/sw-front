import  { FC, useMemo } from 'react';
import { format } from '../../helpers/numberFormater';
import { IItemSelectedCard } from '../../types/Card';
import TrashBin from '../icons/TrashBin'; 
import { CONDITIONS } from '../../constants/item-conditions';

const ItemSelectedCard: FC<IItemSelectedCard> = ( { image, price, condition, name, onClick } ) => {
    const [type, modification] = name.split('|')
    //.split(/[ -]+/)

    const { color, shortName } = useMemo(() => {
         const idx = CONDITIONS.findIndex((el) => condition <= el.maxVal )
         const currentCondition= CONDITIONS[idx]
         const shortName = currentCondition?.text.split(/[ -]+/).map(str => str.slice(0,1).toUpperCase())
       return {
        color: currentCondition?.color,
        shortName
       }
    }, [condition])


    return (
        <div className='relative h-40 shrink-0 border-b border-white/10 overflow-hidden'>
            <span
                className="absolute left-[15%] top-[40%] h-0 w-[13%]  "
                style={{
                    boxShadow: 'rgba(255, 255, 255, 0.7) 0px 0px 45px 10px'
                 }}
            />
            <div className='w-full h-full flex text-sm font-medium font-Barlow relative '>
                <div className='w-[40%]  h-full '>
                    <img src={image} alt={name} className='' />
                </div>
                <div className='w-[60%] flex flex-col gap-2 p-2'>
                    <span className='uppercase'>{type}</span>
                    <h4 className='text-white text-lg'>{modification}</h4>
                    <span className='text-2xl text-white'>${format(price)}</span>
                    <div 
                        className='flex gap-2 items-center'
                        style={{color}}
                        >
                        <div 
                            className='border text-xs px-1'
                            style={{ borderColor:`${color}` }}
                        >{shortName}</div>
                        <span className='font-normal'>{condition} wear</span>
                    </div>
                </div>
            </div>
            <div 
                className='absolute h-4 w-4 right-2 top-2 text-graySecondary group cursor-pointer'
                onClick={onClick}
            >
                <TrashBin iconClasses='group-hover:text-graySecondary/90 ' />
            </div>
        </div>
    );
};

export default ItemSelectedCard;