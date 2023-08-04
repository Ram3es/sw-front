import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { classNames } from '../../helpers/className'

const Dropbox = ({ label, onChange, children, renderSubHeader, additionalClasses }: { label: string, onChange?: (value: any) => void, children?: JSX.Element, renderSubHeader?: JSX.Element, additionalClasses?: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => { setIsOpen(!isOpen) }

  return (
    <Listbox onChange={onChange}>
      {() => (
        <>
          <div className="relative">
            <Listbox.Button onClick={toggle} className={classNames('relative w-full cursor-pointer flex justify-between items-center',
              additionalClasses ?? 'text-sm text-white uppercase')}>
                    <div className="flex items-center gap-2">
                      <span>{label}</span>
                      {isOpen && renderSubHeader}
                    </div>

              <Chevron
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
