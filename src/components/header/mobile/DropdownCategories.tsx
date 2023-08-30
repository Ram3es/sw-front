
import React from 'react'
import { classNames } from '../../../helpers/className'
import { Listbox } from '@headlessui/react'
import { CATEGORIES } from '../../../constants/categories'
import ListBoxWrapper from '../../../containers/ListboxWrapper'
import Image from 'next/image'

const DropdownCategories = () => {
  return (
        <ListBoxWrapper
          title={(isOpen) => (
            <div className={classNames('w-full flex items-center justify-between duration-100',
              isOpen ? 'text-white' : 'text-graySecondary'
            )}>
                <span className='text-lg uppercase'>categories</span>
                <Image
                  width={12}
                  height={12}
                  src="/chevron-down.svg"
                  alt="chevron-down"
                  className={classNames('fill-current', isOpen ? 'rotate-180' : '')}
                />
            </div>)}
          className='px-[0px] [&>svg]:hidden w-full flex justify-between'
        >
            <Listbox.Options className='flex flex-col gap-8 p-6 my-5 bg-darkGrey corner-lb-clip-4'>
                <div className="flex gap-8">
                    <div className='w-1/2 flex flex-col gap-4'>
                      <Listbox.Option value={CATEGORIES.knives.name}>
                        <span className="uppercase text-white hover:text-graySecondary font-semibold text-lg tracking-[1.44px] button">
                            {CATEGORIES.knives.name}
                         </span>
                      </Listbox.Option>
                        <div className="flex flex-col gap-1">
                            {CATEGORIES.knives.models.map((obj) => (
                            <Listbox.Option key={obj.name} value={obj.name}>
                                <span className="block text-graySecondary text-sm tracking-[1.12px] hover:text-white button  uppercase ">
                                {obj.name}
                                </span>
                            </Listbox.Option>
                            ))}
                        </div>
                        <Listbox.Option value={CATEGORIES.gloves.name}>
                        <span className="uppercase text-white hover:text-graySecondary font-semibold text-lg tracking-[1.44px] button">
                            {CATEGORIES.gloves.name}
                         </span>
                      </Listbox.Option>
                        <div className="flex flex-col gap-1">
                            {CATEGORIES.gloves.models.map((obj) => (
                            <Listbox.Option key={obj.name} value={obj.name}>
                                <span className="block text-graySecondary text-sm tracking-[1.12px] hover:text-white button  uppercase ">
                                 {obj.name}
                                </span>
                            </Listbox.Option>
                            ))}
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-col gap-4'>
                        {Object.entries(CATEGORIES).map(([category, value]) => {
                          if (!['knives', 'gloves', 'rest'].includes(category)) {
                            return <React.Fragment key={value.name}>
                            <Listbox.Option value={value.name}>
                              <span className="uppercase text-white hover:text-graySecondary font-semibold text-lg tracking-[1.44px] button">
                                {value.name}
                              </span>
                            </Listbox.Option>
                            <div className="flex flex-col gap-1">
                              {value.models.map((obj) => (
                                <Listbox.Option key={obj.name} value={obj.name}>
                                  <span className="block text-graySecondary text-sm tracking-[1.12px] hover:text-white button  uppercase ">
                                    {obj.name}
                                  </span>
                                </Listbox.Option>
                              ))}
                            </div>
                            </React.Fragment>
                          }
                          return null
                        })}
                    </div>
                </div>
                <div className='flex gap-6'>
                    <div className='w-1/2 flex flex-col gap-6'>
                      {CATEGORIES.rest.models.map((value, idx) => idx <= 4 && (
                        <Listbox.Option key={value.name} value={value.name}>
                        <span className="uppercase text-white hover:text-graySecondary font-semibold text-lg tracking-[1.44px] button">
                          {value.name}
                        </span>
                      </Listbox.Option>
                      ))}
                    </div>
                    <div className='w-1/2 flex flex-col gap-6'>
                      {CATEGORIES.rest.models.map((value, idx) => idx > 4 && (
                        <Listbox.Option key={value.name} value={value.name}>
                        <span className="uppercase text-white hover:text-graySecondary font-semibold text-lg tracking-[1.44px] button">
                          {value.name}
                        </span>
                      </Listbox.Option>
                      ))}
                    </div>
                </div>
             </Listbox.Options>
            </ListBoxWrapper>
  )
}

export default DropdownCategories
