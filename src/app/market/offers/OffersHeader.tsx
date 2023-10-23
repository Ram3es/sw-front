'use client'
import Bar from '@/components/Bar/Bar';
import ChevronDown from '@/components/icons/ChevronDown';
import CloseIcon from '@/components/icons/CloseIcon';
import { gamesLinks } from '@/constants/games';
import { useAppContext } from '@/context/AppContext';
import { useMarketOffersCtx } from '@/context/MarketOffers';
import { classNames } from '@/helpers/className';
import { ISortByOptions } from '@/types/Market';
import { Listbox } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const OffersHeader = () => {
    const { gameId } = useAppContext()
    const { 
      updateFilter,
      resetFilters,
      resetSideBarFilters,
      setHeaderFilterOptions,
      sortOptions,
      search
     } = useMarketOffersCtx()
     const { push } = useRouter()


    const onChangeFilter = (value: ISortByOptions) => {
      setHeaderFilterOptions(prev => ({
        ...prev,
        sortBy: value.name

      }))
      updateFilter({ sortBy: value.name })
    }
   
    return(
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
            {
              search 
                ? <div className='text-graySecondary flex flex-col text-sm tracking-[1.12px]'>
                    <span className='uppercase'>results for</span>
                    <div className='flex gap-4 items-center'>
                      <div className='text-white text-24 '>'{search}'</div>
                      <div onClick={() => { push(`/market/offers?appId=${gameId}`);resetSideBarFilters(); resetFilters()}} className='hover:text-white duration-200 cursor-pointer'>
                        <CloseIcon className='h-[18px]' />
                      </div>
                    </div>
                  </div>
                : gamesLinks.find((game) => game.id === gameId)?.name ?? ''
            }
          </h1>
          <div className='text-white w-max relative'>
            <Listbox onChange={onChangeFilter}>
              <Listbox.Button className='relative w-full cursor-pointer text-sm  text-graySecondary uppercase flex gap-4 justify-between items-center '>
                {({ open }) => (<>
                      <div className="flex items-center text-sm tracking-[1.12] gap-2 label-wrap">
                       { sortOptions.options.find(el => el.name === sortOptions.sortBy )?.label ?? '' }
                      </div>
                <ChevronDown
                  className={classNames('fill-current h-[12px] w-[12px]', open ? 'rotate-180' : '')}
                />
                </>)}
              </Listbox.Button>
              <Listbox.Options className={'absolute top-9 right-0 min-w-[200px] flex flex-col gap-2 p-4 text-sm bg-darkGrey '}>
                {sortOptions.options.map((option, idx) =>
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