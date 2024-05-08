'use client'
import ArrowRight from '@/components/icons/ArrowRight';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
const TITLE_ROUTES = [
    {
        path: '/settings',
        title : 'settings'
    },
    {
        path: '/settings/instant',
        title : 'settings',
        index: true
    },
    {
        path: '/settings/billing-info',
        title : 'billing information',
    },
    {
        path: '/settings/trade-url',
        title : 'steam trade url',
    },
    {
        path: '/settings/email-setup',
        title : 'email',
    }
]

const Heading = () => { 
    const pathname = usePathname()
    const { back } = useRouter()
    return (
        <div className="flex justify-between items-center h-full px-6">
            {TITLE_ROUTES.map( route => {
               if( route.path === pathname ){
                const isShown: boolean =  route.path.split('/').length > 2 && !route.index
                return (
                  <div key={route.title} className='flex items-center gap-5'>
                    <div onClick={back} className={isShown ? 'flex text-graySecondary hover:text-white duration-200 cursor-pointer' : 'hidden'}>
                      <ArrowRight className=' w-5 h-auto -rotate-180' />
                    </div>
                    <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
                        {route.title}
                    </h1>
                  </div>
                )
            }
               return null
            } )}
        </div>
    );
};

export default Heading;