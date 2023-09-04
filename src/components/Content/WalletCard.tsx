'use client'
import React, { useEffect, useRef, useState } from 'react';
import EditPencil from '../icons/EditPencil';
import InformationIcon from '../icons/InformationIcon';
import { classNames } from '@/helpers/className';

const WalletCard = ({ title, placeholder } : { title: string, placeholder: string  }) => {
    const [ value, setValue] = useState(placeholder)
    const [isEditMode, setIsEditMode] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        isEditMode && ref.current?.focus()
    } ,[isEditMode])
    return (
      <div className=" w-full flex items-start sm:items-center px-6 py-4 border border-darkGrey ">
        <div className=' w-[calc(100%_-_20px)] flex flex-col gap-y-4 sm:flex-row '>
          <div className="flex min-w-[180px] items-end  gap-3 sm:gap-0" >
            <span className=" w-max sm:max-w-[80px] block leading-[18px] text-lg small-caps tracking-[1.44px]">{title}</span>
            <InformationIcon iconClasses="w-[14px] h-auto" />   
          </div>
           <div className={classNames('text-white w-full my-auto truncate focus-within:hidden',
             isEditMode ? 'hidden' : 'block' )}>
              {value}
            </div>
           <div className=' h-full flex flex-col'>
          <input
            ref={ref}
            type='text'
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
            onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            className={classNames('bg-transparent outline-none w-full mr-8',
              isEditMode ? 'block' : 'hidden' )}
          />
          {/* <p>Check example@gmail.com for confirmation email and click the link in the mail for verification.</p> */}
          </div>
        </div>
        <div onClick={() => setIsEditMode(boolean => !boolean)} className="hover:text-white duration-200 cursor-pointer shrink-0" >
          <EditPencil />
        </div>
      </div>
    );
};

export default WalletCard;