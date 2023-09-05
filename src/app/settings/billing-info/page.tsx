'use client'
import InputWithErrors from '@/components/Content/InputWithErrors';
import CheckCircle from '@/components/icons/settings/CheckCircle';
import TriangleExclamation from '@/components/icons/settings/TriangleExclamation';

import React from 'react';

const BillingInfo = () => {
    return (
        <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] flex flex-col gap-8 mx-auto '>
             <form className='text-white flex flex-col gap-4'>
              <InputWithErrors
                label='first name'
                value={''}
                variant='coupon'
                handleChange={() => { } }
                error={{status: true, message: 'try input some differernt'}}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                />
                <InputWithErrors
                label='last name'
                value={''}
                variant='coupon'
                handleChange={() => { } }
                error={{status: false, message: 'try input some differernt'}}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                />
              <div className='border-b border-darkGrey my-6' />
              <InputWithErrors
                label='address line 1'
                value={''}
                variant='coupon'
                handleChange={() => { } }
                error={{status: false, message: 'try input some differernt'}}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                />
                <InputWithErrors
                label='address line 2'
                value={''}
                variant='coupon'
                handleChange={() => { } }
                error={{status: false, message: 'try input some differernt'}}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                />
                <div className='grid grid-cols-5 gap-x-4'>
                  <div className='col-span-2'>
                  <InputWithErrors
                    label='ZIP/Postal code'
                    value={''}
                    variant='coupon'
                    handleChange={() => { } }
                    error={{status: false, message: 'try input some differernt'}}
                    errorBorder='border-2 border-swRed'
                    errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                    successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                    activeClass='focus-within:border-swViolet'
                    wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                    />
                  </div>
                  <div className='col-span-3'>
                  <InputWithErrors
                    label='city'
                    value={''}
                    variant='coupon'
                    handleChange={() => { } }
                    error={{status: false, message: 'try input some differernt'}}
                    errorBorder='border-2 border-swRed'
                    errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                    successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                    activeClass='focus-within:border-swViolet'
                    wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                    />
                  </div>
                </div>
                <InputWithErrors
                    label='state or province'
                    value={''}
                    variant='coupon'
                    handleChange={() => { } }
                    error={{status: false, message: 'try input some differernt'}}
                    errorBorder='border-2 border-swRed'
                    errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                    successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                    activeClass='focus-within:border-swViolet'
                    wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                    />
             </form>
           </div>
        </div>

    );
};

export default BillingInfo;