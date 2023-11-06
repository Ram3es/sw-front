
import { IError } from '@/app/settings/billing-info/page';
import { DAYS, MONTHS, YEARS } from '@/constants/birthday-icker-options';
import { classNames } from '@/helpers/className';
import { Listbox } from '@headlessui/react';
import { isValid, parse } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface IBirthdayProps {
  dateMs: number | null
  error?: IError
  onChange: (value:number) => void
}

const BirthdayPicker = ({ dateMs, error, onChange }: IBirthdayProps ) => {
  const [birthdayDate, setBirthdayDate] = useState<Record<string,string>>({
       day:  '',
       month:  '',
       year: '' 
      })

      const Fields = [
        {
          name: 'day',
          label: 'Day',
          options: DAYS,
          handleFn: (value: string) => {
            setBirthdayDate(prev => ({
              ...prev, day: value
            }))
          }
        },
        {
          name: 'month',
          label: 'Month',
          options: MONTHS,
          handleFn: (value: string) => {
            setBirthdayDate(prev => ({
              ...prev, month: value
            }))
          }
        },
        {
          name: 'year',
          label: 'Years',
          options: YEARS,
          handleFn: (value: string) => {
            setBirthdayDate(prev => ({
              ...prev, year: value
            }))
          }
        }
       
      ]

      useEffect(() => {
        if(dateMs){
          const currentDay = new Date(dateMs).getDate() 
          const currentMonth = new Date(dateMs).getMonth() + 1 
          const day = currentDay <= 9 ?`0${currentDay}` : currentDay.toString()
          const month = currentMonth <= 9 ?`0${currentMonth}` : currentMonth.toString()
          const year = new Date(dateMs).getFullYear().toString() 
          setBirthdayDate(prev => ({
            ...prev,
            day,
            month,
            year
          }))
        }
      }, [dateMs])

    useEffect(() => {
      if(Object.values(birthdayDate).every(value => !!value)){
        const parsed = parse(Object.values(birthdayDate).join(), 'dd,MM,yyyy', new Date())
        const isFuture = new Date(parsed).getTime() > Date.now()
        if(!isValid(parsed) || isFuture){
          return onChange(0)
        }
        onChange(new Date(parsed).getTime())
      }
    }, [birthdayDate])
    return (
        <div className=' flex flex-col gap-3 text-graySecondary '>
          <h2 className='uppercase text-lg small-caps tracking-[1.44px]'>birthdate</h2>
          <div className='flex gap-8'>
          {Fields.map((field) => (
             <Listbox key={field.name} onChange={field.handleFn} >
             <div className='relative'>
               <Listbox.Button className='h-14 w-max bg-darkGrey flex flex-col items-center px-6 py-2 '>
                 <span className='text-11'>{field.label}</span>
                 <span className='text-lg leading-tight text-white'>{birthdayDate[field.name as string]}</span>
               </Listbox.Button>
               <Listbox.Options className= 'absolute -top-[446px] max-h-[440px] overflow-auto bg-white'>
                 {field.options.map((opt, idx) => (
                   <Listbox.Option 
                     key={idx}
                     value={opt}
                   >
                     <span className='block text-black text-lg hover:bg-blue-500 w-full hover:text-white py-2 px-6 cursor-default'>
                       {opt}
                     </span>
                   </Listbox.Option>
                 ))}
               </Listbox.Options>
             </div>
           </Listbox>
          ))}
          </div>
            <div className={classNames(' ml-4 ', error?.errorClass ?? '')}>{error?.status && error.message}</div>
        </div>
    );
};

export default BirthdayPicker;