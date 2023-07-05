import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { classNames } from "../../helpers/className";



const Dropbox = ({label, onChange, children, options,renderSubHeader, listClasses, additionalClasses }: {label: string, onChange?: (value: any) => void, children?: JSX.Element, listClasses?: string,renderSubHeader?:JSX.Element, additionalClasses?: string, options?:string[]}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Listbox onChange={onChange}>
      {() => (
        <>
          <div className="relative">
            <Listbox.Button onClick={toggle} className={classNames("relative w-full cursor-pointer flex justify-between items-center", 
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
              as={Fragment}
            >
              <Listbox.Options className={listClasses ?? "z-10 mt-1 w-full"}>
                {options 
                  ? options.map(item => (
                        <Listbox.Option
                          key={item}
                          as='span'
                          value={item}
                          className='flex py-1.5 px-2 hover:text-white cursor-pointer'
                          onClick={toggle}
                        >
                          {item}
                        </Listbox.Option>
                  ) ) 
                  : children }
  
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Dropbox;
