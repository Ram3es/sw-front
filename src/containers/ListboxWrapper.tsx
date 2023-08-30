
import { Listbox } from '@headlessui/react'
import Image from 'next/image'
import { classNames } from '../helpers/className'
import ChevronDown from '@/components/icons/ChevronDown'

const ListBoxWrapper = ({ title, className, children, onChange }: { children: JSX.Element, title: string | ((open?: boolean) => JSX.Element), className?: string, onChange?: (value: string) => void }) => {
  return (
        <Listbox onChange={onChange}>
            <Listbox.Button className={classNames(className ?? '', 'full flex gap-2 px-4 items-center text-graySecondary hover:text-white button font-Barlow tracking-[1.12px] uppercase')}>
                {({ open }) => (
                    <>
                        {typeof title === 'function' ? title(open) : title}
                        <ChevronDown
                            className={classNames('fill-current h-[12px] w-[12px]', open ? 'rotate-180' : '')}
                        />
                    </>
                )}
            </Listbox.Button>
            {children}
        </Listbox>
  )
}

export default ListBoxWrapper
