import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import ListBoxWrapper from '../../containers/ListboxWrapper'

const NavDropdown = ({ title, setSelected, children }: { title: string, setSelected: (select: any) => void, children: JSX.Element }) => {
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
                    {children}
                </Listbox.Options>

            </Transition>
        </ListBoxWrapper>
  )
}

export default NavDropdown
