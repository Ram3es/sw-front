import { EToastType } from '@/types/Enums';
import React, { useEffect, useRef } from 'react';
import RoundedMark from '../icons/RoundedMark';
import CloseIcon from '../icons/CloseIcon';
import TriangleExclamation from '../icons/settings/TriangleExclamation';
import ExclamationTriangleIcon from '../icons/ExclamationTriangle';

interface IToastProps {
    type: keyof typeof EToastType
    message: string
    remove: () => void
}

const TYPES: Record<keyof typeof EToastType, any> = {
    error: {
        icon:<ExclamationTriangleIcon className='w-6 h-auto text-swRed' />,
        color: '#ed2424'
    },
    success: {
        icon: <RoundedMark className='w-4 h-auto text-swLime' />,
        color: '#18E86B'
    },
    

}

const Toast = ({ type, message, remove }:IToastProps) => {

  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    setTimeout(() => {
      if(ref.current){
        ref.current.style.translate = '200px'
        ref.current.style.opacity = '0'

      }
      setTimeout(() => remove(), 200 ) 
    }
    , 3000)
  },[])
  
    return (
        <div ref={ref} className='mr-8 ml-auto transform duration-300  '>
            <div 
              className='w-max px-4 py-3 border justify-center cta-clip-path  text-graySecondary  relative'
              style={{
                color: TYPES[type].color,
                borderColor: TYPES[type].color
              }}
            >
                <div className='flex items-center gap-3'>
                  {TYPES[type].icon}
                  <span className='first-capital'>{message}</span>
                  <div onClick={() => remove()} className='cursor-pointer ml-6 group p-1'> 
                    <CloseIcon className=' text-graySecondary group-hover:text-white/80 duration-200 w-2.5 h-auto ' />
                  </div>
                </div>
                <div 
                  className='absolute w-3 bottom-[3px] -left-[3px] border-b  rotate-45'
                  style={{ borderColor: TYPES[type].color}} 
                />
            </div>
        </div>
    );
};

export default Toast;