import logo from '../../../assets/logo-skinwallet.inline.svg'
import { Button } from '../../../components/Navigation';
import ExclamationTriangleIcon from '../../../components/icons/ExclamationTriangle';
import { format } from '../../../helpers/numberFormater';
import { classNames } from '../../../helpers/className';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AmontPayout = () => {
    const [isError, setIsError] = useState(true)
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center mx-auto'>
        <div className=' flex items-center gap-2 mb-6'>
          <img src={logo} alt="logo" />
          <h2 className='text-24 leading-6 font-medium text-swLime'>Instant</h2>
        </div>
        <div 
          className={classNames('w-full max-w-[472px] p-6 bg-swOrange text-sm font-Barlow font-medium cta-tr-corner duration-300',
            isError ? 'translate-y-0': 'translate-y-full'
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
        <div className='w-full max-w-[472px] flex flex-col gap-4 px-9 py-6 text-sm text-white font-Barlow bg-almostBlack cta-clip-path '>
          <h4 className='uppercase tracking-widest'>Set payout amount</h4>
          <div className=' h-16 flex justify-between items-center px-4 font-semibold text-2xl border border-swGrey relative overflow-hidden cta-clip-path'>
            <div className='text-swGrey'> - </div>
            <span className=' tracking-widest '>${format(1550.56)}</span>
            <div className='text-swGrey'> + </div>
            <div className='w-4 absolute -left-[6px] bottom-1 border border-b border-swGrey rotate-45'/>
          </div>
          <p className='mx-auto font-normal'><span className='text-swGrey'>Daily payout limit</span> $1,000.00 ($1,000.00 left)</p>
          <div className='h-12 mt-[20%]'>
            <Button 
              text='NEXT'
              className='w-full h-full bg-swLime text-darkSecondary cta-clip-path tracking-widest text-21 font-medium hover:brightness-110 ' 
              onClick={() => navigate('method')}
            />
          </div>
        </div>
      </div>
    );
};

export default AmontPayout;