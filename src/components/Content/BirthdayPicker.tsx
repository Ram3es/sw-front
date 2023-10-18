import { DAYS } from '@/constants/birthday-icker-options';
import { Listbox } from '@headlessui/react';
import React, { useState } from 'react';

const BirthdayPicker = () => {
    const [selected, setSelected] = useState<string>()
    return (
        <div className=' flex flex-col gap-4 text-graySecondary '>
          <h2 className='uppercase text-lg small-caps tracking-[1.44px]'>birthdate</h2>
          <Listbox value={selected} onChange={setSelected} >
            <div className='relative'>
              <Listbox.Button className='h-14 w-max bg-darkGrey flex flex-col items-center px-6 py-2 '>
                <span className='text-11'>Day</span>
                <span className='text-lg leading-tight text-white'>{selected}</span>
              </Listbox.Button>
              <Listbox.Options className= 'absolute -top-[440px] max-h-[440px] overflow-auto bg-white'>
                {DAYS.map((day, idx) => (
                  <Listbox.Option 
                    key={idx}
                    value={day}
                  >
                    <span className='block text-black text-lg hover:bg-blue-500 w-full hover:text-white py-2 px-5 cursor-pointer'>
                      {day}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
            
        </div>
    );
};

export default BirthdayPicker;