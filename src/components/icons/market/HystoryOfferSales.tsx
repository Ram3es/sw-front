'use client'
import ListBoxWrapper from '@/containers/ListboxWrapper';
import { format } from '@/helpers/numberFormater';
import { IOfferHistory } from '@/types/Market';
import { format as formatDate } from 'date-fns'
import React, { useMemo, useState } from 'react';

const HystoryOfferSales = ({ history }: { history?: IOfferHistory[] } ) => {
    const [isShownAllHistory, setIsShownAllHistory] = useState(false) 
    const renderhistory = useMemo(() => isShownAllHistory  ? history : history?.slice(0, 5),[isShownAllHistory, history])
    return (
         history?.length ?
        <div className='w-full px-6 mb-12'>
          <div className='max-w-[1168px] mx-auto'>
            <h2 className='text-white text-2xl uppercase tracking-[1.2px] mb-10'>sales history</h2>
            <div className='grid grid-cols-8 text-graySecondary text-sm leading-[14px] uppercase tracking-[0.96px] pb-2 border-b border-darkGrey'>
              <div className='col-span-4'>date</div>
              <div className='col-span-2'>float</div>
              <div>pattern</div>
              <div className='text-right'>sale price</div>
            </div>
              {renderhistory?.map(sale =>(
                <div key={sale.soldAt} className='py-6  border-b border-darkGrey '>
                  <div className='grid grid-cols-8 text-graySecondary uppercase tracking-[0.96px]'>
                    <div className='col-span-4'>{formatDate((sale.soldAt * 1000),'dd.MM.yyyy, H:mm')}</div>
                    <div className='col-span-2 text-white tracking-[0.8px]'>{sale.wear.toFixed(5)}</div>
                    <div>{sale.paintSeed}</div>
                    <div className='text-right text-white'>${format(sale.soldFor.amount)}</div>
                  </div>
                </div>
              ))}
              <div className=' flex justify-center py-4'>
                <ListBoxWrapper 
                    title={(open) => {
                        setIsShownAllHistory(open as boolean)
                        return open 
                         ? <span>show less</span> 
                         : <span>show more</span>
                    }}
                >
                  <></>
                </ListBoxWrapper>
              </div>
            </div>
        </div>
        : null
        );
};

export default HystoryOfferSales;