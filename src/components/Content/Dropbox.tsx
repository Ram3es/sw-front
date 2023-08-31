import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { classNames } from '../../helpers/className'
import ChevronDown from '../icons/ChevronDown'

const Dropbox = ({ label, onChange, children, renderSubHeader, additionalClasses }: { label: string | ((isOpen?: boolean) => JSX.Element), onChange?: (value: any) => void, children?: JSX.Element, renderSubHeader?: JSX.Element, additionalClasses?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => { setIsOpen(!isOpen) }

  return (
    <Listbox onChange={onChange}>
      {() => (
        <>
          <div className="relative">
            <Listbox.Button onClick={toggle} className={classNames('relative w-full cursor-pointer ',
              additionalClasses ?? 'text-sm text-white uppercase flex justify-between items-center')}>
                    <div className="flex items-center gap-2 label-wrap">
                      {typeof label === 'function' ? label(isOpen) : label }
                      {isOpen && renderSubHeader}
                    </div>

              <ChevronDown
                className={classNames('fill-current h-[12px] w-[12px]', isOpen ? 'rotate-180' : '')}
              />
            </Listbox.Button>

            <Transition
              show={isOpen}
            >
              { children }
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Dropbox
