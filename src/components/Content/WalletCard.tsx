'use client'
import React, { useEffect, useRef, useState } from 'react';
import EditPencil from '../icons/EditPencil';
import InformationIcon from '../icons/InformationIcon';
import { classNames } from '@/helpers/className';
import { Button } from '../Navigation';

const WalletCard = ({ title, placeholder } : { title: string, placeholder: string  }) => {
    const [ value, setValue] = useState(placeholder)
    const [isEditMode, setIsEditMode] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        isEditMode && ref.current?.focus()
    } ,[isEditMode])
    return (
      <div className=" w-full flex  px-6 py-4 border border-darkGrey ">
        <div className=' w-[calc(100%_-_20px)] flex flex-col gap-y-4 sm:flex-row '>
          <div className="flex min-w-[180px] items-start gap-3 sm:gap-0" >
            <span className=" w-max sm:max-w-[80px] block leading-[18px] text-lg small-caps tracking-[1.44px]">{title}</span>
            <InformationIcon iconClasses="w-[14px] h-auto mt-1 sm:mt-5" />   
          </div>
           <div className=' h-full flex flex-col gap-4 mt-2'>
            {!isEditMode 
              ? <div className={classNames('text-white w-full truncate focus-within:hidden')}>
                   {value}
                </div>
              :
              (
                <>
                  <input
                    ref={ref}
                    type='text'
                    value={value}
                    onChange={(e) => { setValue(e.target.value); } }
                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                    className={classNames('bg-transparent outline-none w-full mr-8')} 
                  />
                  <p>Check <span className='text-swViolet'>{value}</span> for confirmation email and click the link in the mail for verification.</p>
                  <Button
                    text='resend'
                    className=' relative w-max border border-graySecondary group hover:text-white hover:border-white justify-center cta-clip-path uppercase text-graySecondary duration-200'
                    heightClass='h-11'
                    >
                    <div className='absolute w-4 bottom-1 -left-[5px] border-b border-graySecondary group-hover:border-white rotate-45 duration-200' />
                  </Button>
                </>
              )
              }
          </div>
        </div>
        <div onClick={() => setIsEditMode(boolean => !boolean)} className="hover:text-white duration-200 cursor-pointer shrink-0  sm:mt-2" >
          <EditPencil />
        </div>
      </div>
    );
};

export default WalletCard;