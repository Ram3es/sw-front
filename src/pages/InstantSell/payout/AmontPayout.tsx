import logo from '../../../assets/logo-skinwallet.inline.svg'
import { Button } from '../../../components/Navigation';
import ExclamationTriangleIcon from '../../../components/icons/ExclamationTriangle';
import { format } from '../../../helpers/numberFormater';
import { classNames } from '../../../helpers/className';
import { useState } from 'react';
import { usePayoutContext } from '../../../context/PayoutContext';
import PaperPayout from './PaperPayout';

const AmontPayout = () => { 
    const { amount, setPayoutStep } = usePayoutContext()
    const [isError, setIsError] = useState(true)
    return (
        <div className='flex flex-col items-center mx-auto max-w-[472px]'>
            <div className=' flex items-center gap-2 mb-6'>
                <img src={logo} alt="logo" />
                <h2 className='text-24 leading-6 font-medium text-swLime'>Instant</h2>
            </div>
            <div 
                className={classNames('w-full max-w-[472px] p-6 bg-swOrange text-sm font-Barlow font-medium cta-tr-corner duration-300',
                    isError ? 'block':'hidden'
                )}
            >
            <div className='w-max flex items-center gap-2 py-1 px-3 rounded-full border text border-darkSecondary  '>
                <ExclamationTriangleIcon />
                <p className='uppercase tracking-[1.12px] '>Daily payout limit exceeded</p>
            </div>
            <p className='max-w-[346px] pt-4 font-normal [&>span]:font-semibold '>
                You can payout a maximum of <span>${format(750.50)}</span> due to the <span>${format(1000)}</span> daily payout limit.
            </p>
            </div>
            <PaperPayout title='Set payout amount' >
                <>
                    <div className=' h-16 flex justify-between items-center px-4 font-semibold text-2xl border border-graySecondary relative overflow-hidden cta-clip-path'>
                        <div className='text-graySecondary'> - </div>
                        <span className=' tracking-widest '>${format(amount)}</span>
                        <div className='text-graySecondary'> + </div>
                        <div className='w-4 absolute -left-[6px] bottom-1 border border-b border-graySecondary rotate-45'/>
                    </div>
                    <p className='mx-auto font-normal'><span className='text-graySecondary'>Daily payout limit</span> $1,000.00 ($1,000.00 left)</p>
                    <div className='h-12 mt-[20%]'>
                        <Button 
                            text='NEXT'
                            className='w-full h-full flex justify-center bg-swLime text-darkSecondary cta-clip-path tracking-widest text-21 font-medium hover:brightness-110 ' 
                            onClick={() => setPayoutStep('method')}
                        />
                    </div>
                </>
            </PaperPayout>
      </div>
    );
};

export default AmontPayout;