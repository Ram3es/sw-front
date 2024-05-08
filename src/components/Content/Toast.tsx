import { EToastType } from '@/types/Enums';
import React, { useEffect, useRef } from 'react';
import RoundedMark from '../icons/RoundedMark';
import CloseIcon from '../icons/CloseIcon';
import ExclamationTriangleIcon from '../icons/ExclamationTriangle';

interface IToastProps {
    type: keyof typeof EToastType
    message: string
    remove: () => void
}

const TYPES: Record<keyof typeof EToastType, any> = {
    error: {
        icon:<ExclamationTriangleIcon className='w-6 h-auto text-swRed shrink-0' />,
        color: '#ed2424'
    },
    success: {
        icon: <RoundedMark className='w-4 h-auto text-swLime shrink-0' />,
        color: '#18E86B'
    },
    
}

const Toast = ({ type, message, remove }:IToastProps) => {

  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const appearTimeoutId = setTimeout(() => {
      if(ref.current){
        ref.current.style.transform = 'translateY(0)'
        ref.current.style.opacity = '100'
      }
    },100)
    
    const hideTimeoutId = setTimeout(() => {
      if(ref.current){
        ref.current.style.transform = 'translateX(200px)'
        ref.current.style.opacity = '0'

      }
      setTimeout(() => remove(), 200) 
    }
    , 3000)
    return () => {
      clearTimeout(appearTimeoutId)
      clearTimeout(hideTimeoutId)
    }
  },[])
  
    return (
        <div ref={ref} className='duration-200 opacity-0 translate-y-[200px] '>
            <div 
              className=' w-screen ssl:w-full  px-4 py-3 border justify-center cta-clip-path  bg-darkSecondary text-graySecondary  relative'
              style={{
                color: TYPES[type].color,
                borderColor: TYPES[type].color
              }}
            >
                <div className='w-full flex items-center gap-3'>
                  {TYPES[type].icon}
                  <div className='first-capital max-w-[300px]'>{message}</div>
                  <div onClick={() => remove()} className='cursor-pointer ml-6 group p-1 ml-auto'> 
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