'use client'
import Bar from '@/components/Bar/Bar';
import ChevronDown from '@/components/icons/ChevronDown';
import { useAppContext } from '@/context/AppContext';
import { useMarketOffersCtx } from '@/context/MarketOffers';
import { classNames } from '@/helpers/className';
import { ESteamAppId } from '@/types/Inventory';
import { ISortByOptions } from '@/types/Market';
import { Listbox } from '@headlessui/react';
import React, { useEffect, useState } from 'react';

const OffersHeader = () => {
    const { gameId } = useAppContext()
    const { 
      updateFilter,
      headerFilterOptions,
      filtersState
     } = useMarketOffersCtx()
    const [selectedFilter, setSelectedFilter] =useState<ISortByOptions>()

    useEffect(() => {
      if(headerFilterOptions.length && filtersState.sortBy ){
        setSelectedFilter(headerFilterOptions.find( opt => opt.name ===  filtersState.sortBy ))
      }
    }, [headerFilterOptions])

    const onChangeFilter = (value: ISortByOptions) => {
      setSelectedFilter(value)
      updateFilter({ sortBy: value.name })
    }
   
    return(
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
            {Object.keys(ESteamAppId)[Object.values(ESteamAppId).indexOf(gameId)]}
          </h1>
          <div className='text-white w-max relative'>
            <Listbox onChange={onChangeFilter}>
              <Listbox.Button className='relative w-full cursor-pointer text-sm  text-graySecondary uppercase flex gap-4 justify-between items-center '>
                {({ open }) => (<>
                      <div className="flex items-center text-sm tracking-[1.12] gap-2 label-wrap">
                       {selectedFilter?.label}
                      </div>
                <ChevronDown
                  className={classNames('fill-current h-[12px] w-[12px]', open ? 'rotate-180' : '')}
                />
                </>)}
              </Listbox.Button>
              <Listbox.Options className={'absolute top-9 right-0 min-w-[200px] flex flex-col gap-2 p-4 text-sm bg-darkGrey '}>
                {headerFilterOptions.map((option, idx) =>
                  <Listbox.Option 
                    key={idx}
                    value={option}
                    className='cursor-pointer text-graySecondary hover:text-white duration-200' 
                  >
                    <span className='uppercase '>{option?.label}</span>
                  </Listbox.Option> )}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
      </Bar>
    )
};

export default OffersHeader;