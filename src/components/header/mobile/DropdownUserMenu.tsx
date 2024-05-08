import React from 'react'
import { useAppContext } from '../../../context/AppContext'
import { classNames } from '../../../helpers/className'
import Image from 'next/image'
import { Listbox } from '@headlessui/react'
import { type IUserMenu, USER_MENU } from '../../../constants/user-menu-tabs'
import { format } from '../../../helpers/numberFormater'
import ListBoxWrapper from '../../../containers/ListboxWrapper'
import Link from 'next/link'

const DropdownUserMenu = () => {
  const { user } = useAppContext()
  return (
    <ListBoxWrapper
      title={(isOpen) => (
        <div
          className={classNames(
            'w-full flex items-center justify-between duration-100 mx-6 my-8',
            isOpen ? 'text-white' : 'text-graySecondary'
          )}
        >
          <span className="text-lg uppercase">{user?.username}</span>
          <Image
            width={12}
            height={12}
            src="/chevron-down.svg"
            alt="chevron-down"
            className={classNames('fill-current h-[12px] w-[12px]', isOpen ? 'rotate-180' : '')}
          />
        </div>
      )}
      className="px-[0px] [&>svg]:hidden w-full flex justify-between"
    >
      <Listbox.Options className="flex flex-col gap-4 p-6 mx-6 my-5 bg-darkGrey corner-lb-clip-4">
        <div className="flex justify-between items-center text-sm text-graySecondary uppercase">
          Balance
          <span className="text-white text-base">$ {format(user?.balance ?? 0)}</span>
        </div>
        {USER_MENU.map((action, idx) => (
          <React.Fragment key={idx}>
            <div className="my-4 border border-b border-white/5" />
            {action.map((item: IUserMenu) => (
              <Listbox.Option
                value={item.title}
                key={item.title}
                href={item.path ?? '/'}
                onClick={(e) => {
                  if (item.handleFunction) {
                    e.preventDefault()
                    item.handleFunction()
                  }
                }}
                as={Link}
                className={'flex items-center gap-2.5 text-sm text-graySecondary uppercase hover:text-white button'}
              >
                {item.icon}
                {item.title}
              </Listbox.Option>
            ))}
          </React.Fragment>
        ))}
      </Listbox.Options>
    </ListBoxWrapper>
  )
}

export default DropdownUserMenu
