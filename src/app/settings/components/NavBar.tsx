'use client'
import React from 'react';
import { usePathname } from 'next/navigation'
import { BaseLink } from '@/components/Navigation';

const NavBar = () => {
    const pathname = usePathname()

  return (
    <div className='flex items-center w-full h-max pt-5 border-b border-darkGrey'>
      <BaseLink
        href='/settings'
        text='general'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/settings' }
        withBorder
      />
      <BaseLink
        href='/settings/instant'
        text='skinwallet instant'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/settings/instant' }
        withBorder
      />
    </div>
    );
};

export default NavBar;