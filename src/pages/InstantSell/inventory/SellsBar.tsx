import  { ChangeEvent, FC, useState } from 'react';
import { Button } from '../../../components/Navigation';
import Checkbox from '../../../components/Content/Checkbox';
import { NavLink } from 'react-router-dom';
import { classNames } from '../../../helpers/className';
import SymbolIcon from './SymbolIcon';
import { TInventoryCard } from '../../../types/Card';

interface ISellBarProps {
    selectedCards: TInventoryCard[]
}

const SellsBar:FC<ISellBarProps> = ({ selectedCards }) => {
    const [inputValue, setInputValue] = useState('')
    const [isAcceptedPolicy, setIsAcceptedPolicy] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)

    }
    return (
        <div className='sticky top-[60px] flex flex-col  max-w-[429px] w-full h-[859px] gap-6 p-8 text-skinwallerGray side-bar-gradient cta-clip-path'>
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
                    onClick={() => console.log('submit')}
                    className='absolute top-0 right-0 h-full font-medium text-swBlack bg-skinwalletPink/50 hover:bg-skinwalletPink/80 uppercase cursor-pointer cta-clip-path ' 
                />
            </div>
            <div className='flex-grow'>
                <div className='flex items-center justify-between font-medium'>
                    <h5 className='text-lg uppercase tracking-widest'>Selection overview</h5>
                    <div className='flex items-center gap-2'>
                        {0}/100
                        <span> i</span>
                    </div>
                </div>
                <div className='h-full relative py-2  '>
                    {selectedCards.length 
                        ? selectedCards.map(card => <div></div>)
                        : (
                            <div className='flex flex-col items-center mx-auto mt-[40%] font-medium gap-4'>
                                <SymbolIcon />
                                <p>Select items from your inventory.</p>
                                <p className='text-center max-w-[230px]'>You can choose up to 100 items per single transaction</p>

                            </div>
                            )
                    }
                </div>
            </div>
            <div className=' border-b border-white/10' />
            <div className='flex justify-between items-center text-sm font-medium'>
                <h6 className='text-white tracking-widest uppercase'>$50 to next bonus tier</h6>
                <div className='flex items-center gap-2 tracking-widest'>
                    <div className='w-[60px] h-1 bg-[#424242] relative'>
                        <div 
                            className='absolute inset-0 bg-[#6842FF]'
                            style={{ width:`${20}%`}}
                        />
                    </div>
                    +{1}%
                </div>
            </div>
            <div className=' border-b border-white/10' />
            <div className='flex gap-3 items-end'>
                <Checkbox checked={isAcceptedPolicy} onChange={(boolean) => setIsAcceptedPolicy(boolean)} />
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
            <div className='h-12'>
                <Button 
                    text={`GET $${5}.00`}
                    onClick={() => console.log('sell')}
                    className={classNames('w-full h-full text-21 tracking-widest text-white font-semibold bg-linkUnderline/40 cta-clip-path border border-b-[3px] border-linkUnderline ',
                    isAcceptedPolicy ? 'hover:opacity-90' : ' pointer-events-none grayscale '
                    )}
                    disabled={!isAcceptedPolicy}
                />
            </div>
        </div>
    );
};

export default SellsBar;