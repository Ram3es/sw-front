import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { classNames } from "../../helpers/className";


const Dropbox = ({label, onChange, children, renderSubHeader}: {label: string, onChange?: (value: any) => void, children?: JSX.Element, renderSubHeader?:JSX.Element}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Listbox onChange={onChange}>
      {() => (
        <>
          <div className="relative mt-2">
            <Listbox.Button onClick={toggle} className="relative w-full cursor-pointer flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="uppercase text-white font-['Barlow'] text-sm">{label}</span>
                {isOpen && renderSubHeader}
              </div>
              <Chevron
                className={classNames('fill-white h-[12px] w-[12px]', isOpen ? 'rotate-180' : '')}
              />
            </Listbox.Button>

            <Transition
              show={isOpen}
              as={Fragment}
            >
              <Listbox.Options className="z-10 mt-1 w-full">
                {children}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Dropbox;
