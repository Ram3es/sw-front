import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import ListBoxWrapper from '../../containers/ListboxWrapper'
import { CATEGORIES } from '../../constants/categories'

const CategoriesFilters = ({ title }: { title: string }) => {
  const [selected, setSelected] = useState('')

  return (
        <ListBoxWrapper
            title={title}
            onChange={setSelected}
        >
            <Transition
                 as={Fragment}
                 enter="transition ease-out duration-300"
                 enterFrom="transform -translate-y-[calc(100%_+_56px)]"
                 enterTo="transform translate-y-0"
                 leave="transition ease-in duration-300"
                 leaveFrom="transform translate-y-0"
                 leaveTo="transform -translate-y-[calc(100%_+_56px)]"
            >
                <Listbox.Options className={'w-full absolute z-[-1] top-14 left-0 bg-darkGrey p-5'} >
                    <div className='grid grid-cols-categories max-w-[1124px] mx-auto' >
                        {Object.values(CATEGORIES).map(ctegory => (
                            <div className='mb-5' key={ctegory.name}>
                                { ctegory.name !== 'rest'
                                  ? <div className='flex flex-col gap-2'>
                                            <Listbox.Option value={ctegory.name}>
                                                <span className='uppercase text-white hover:text-graySecondary button' >{ctegory.name}</span>
                                            </Listbox.Option>
                                            <div className='flex flex-col gap-1'>
                                                {ctegory.models.map(obj => (
                                                    <Listbox.Option
                                                        key={obj.name}
                                                        value={obj.name}
                                                    >
                                                        <span className='block text-graySecondary  hover:text-white button  each-capitalized '>{obj.name}</span>
                                                    </Listbox.Option>))
                                                }
                                            </div>
                                        </div>
                                  : <div className='flex flex-col gap-6 pl-4'>
                                            {ctegory.models.map(obj => (
                                                <Listbox.Option
                                                    key={obj.name}
                                                    value={obj.name}
                                                >
                                                    <div className='uppercase text-white hover:text-graySecondary button'>{obj.name}</div>
                                                </Listbox.Option>))
                                            }
                                        </div>
                                }

                            </div>
                        ))}
                    </div>

                </Listbox.Options>

            </Transition>
        </ListBoxWrapper>
  )
}

export default CategoriesFilters
