'use client'
import React, { useEffect, useRef, useState } from 'react';
import EditPencil from '../icons/EditPencil';
import InformationIcon from '../icons/InformationIcon';
import { classNames } from '@/helpers/className';
import { Button } from '../Navigation';
import { setWallet } from '@/services/user/user';

export interface IWalletCard {
  id?: number
  currency: string
  title: string
  placeholder: string
  varificationRequired?: boolean
  isVerified?: boolean
  verifyFn?: () => void
  onValueUpdate: (v: string) => void
}

const WalletCard = ({id, currency, title, placeholder, varificationRequired, isVerified, verifyFn, onValueUpdate } : IWalletCard) => {
    const [isEditMode, setIsEditMode] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    const handleSaveBtn = async () => {
      setIsEditMode(false)
      try {
        await setWallet({ id, currency, wallet: placeholder })
        
      } catch (error) {
        
      }
    }

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
                   {placeholder}
                </div>
              :
              (
                <>
                  <input
                    ref={ref}
                    type='text'
                    value={placeholder}
                    onChange={(e) => {
                      onValueUpdate(e.target.value)
                    } }
                    onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                    className={classNames('bg-transparent outline-none w-full mr-8')} 
                  />
                  {!varificationRequired && isEditMode &&
                   <Button
                     text="Save"
                     onClick={handleSaveBtn}
                   className=" w-24 flex justify-center text-base font-medium text-darkGrey bg-skinwalletPink/50 hover:bg-skinwalletPink/80 uppercase cursor-pointer cta-clip-path "
                 />
                  }
                  {varificationRequired && <> <p>Check <span className='text-swViolet'>{placeholder}</span> for confirmation email and click the link in the mail for verification.</p>
                  <Button
                    text='resend'
                    className=' relative w-max border border-graySecondary group hover:text-white hover:border-white justify-center cta-clip-path uppercase text-graySecondary duration-200'
                    heightClass='h-11'
                    onClick={verifyFn}
                    >
                    <div className='absolute w-4 bottom-1 -left-[5px] border-b border-graySecondary group-hover:border-white rotate-45 duration-200' />
                  </Button>
                  </>}
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