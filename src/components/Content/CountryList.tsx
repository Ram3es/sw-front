'use client'
import ListBoxWrapper from '@/containers/ListboxWrapper';
import countryList from 'react-select-country-list'
import React, { useMemo, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { classNames } from '@/helpers/className';
import ChevronDown from '../icons/ChevronDown';

const CountryList = ({ value, onChange } : { value?: string, onChange: (value: string) => void}) => {
    const options = useMemo(() => countryList().getData(), [] )
    return (
            <div className='relative'>
            <Listbox onChange={onChange} >
                <Listbox.Button className={'relative w-full h-14 px-6 bg-darkGrey flex items-center justify-between'}>
                {({ open }) => (
                    <>
                        <span className='text-lg capitalize'>{value ?? 'country'}</span>
                        <ChevronDown
                            className={classNames('fill-current h-[12px] w-[12px]', open ? 'rotate-180' : '')}
                        />
                    </>
                )}
                </Listbox.Button>
                <Listbox.Options className='absolute -top-80  left-0 max-h-80 w-full overflow-auto bg-white  text-base shadow-lg  outline-none sm:text-sm'>
                    {options.map(country => (
                        <Listbox.Option  
                          key={country.value}
                          value={country.label}
                          className='text-black hover:bg-blue-500 hover:text-white'
                        >
                            <span className='py-1 px-2 cursor-default'>{country.label}</span>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            </div>
    );
};

export default CountryList;