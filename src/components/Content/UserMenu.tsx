import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { classNames } from '../../helpers/className';
import { IUserMenu, USER_MENU } from '../../constants/user-menu-tabs';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { format } from '../../helpers/numberFormater';

const renderMenuItem = (item: IUserMenu, itemClasses?: string) => {
    if (item.path) {
        return (
          <Menu.Item
            key={item.title}
            as={NavLink}
            to={item.path}
            className={itemClasses}
          >
            {item.icon}
            {item.title}
          </Menu.Item>
        )
      }
      if (item.handleFunction) {
        return (
          <Menu.Item
            key={item.title}
            onClick={item.handleFunction}
            as='div'
            className={itemClasses}
          >
            {item.icon} 
            {item.title}
          </Menu.Item>
        )
      }

}

const UserMenu = ({ name, balance }: { name: string, balance: number }) => {
    return (
        <Menu as='div' >
            <Menu.Button
                className='relative w-full flex gap-2 items-center text-graySecondary uppercase group hover:text-white button tracking-[1.12px] cursor-pointer'
            >
                {({ open }) => (
                    <>
                        <span>{name}</span>
                        <Chevron className={classNames('fill-current h-[12px] w-[12px]', open ? 'rotate-180' : '')}/>
                    </>)}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className='w-[264px] absolute right-0 top-14 text-white bg-almostBlack p-6 pb-8 cta-clip-path '>
                    <div className='flex justify-between items-center text-sm text-graySecondary uppercase'>
                        Balance
                        <span className='text-white text-base'>$ {format(balance)}</span>
                    </div>
                    {USER_MENU.map((action, idx) => (
                        <React.Fragment key={idx}>
                            <div  className=' my-4 border border-b border-white/5' />
                            {action.map( item => renderMenuItem(item, 'flex items-center py-1.5 gap-2.5 text-sm text-graySecondary uppercase  hover:text-white button'))}
                           
                        </React.Fragment>
                    )
                        )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default UserMenu;