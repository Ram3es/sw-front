"use client"
import React, { ReactComponentElement } from 'react'
import Image from 'next/image'
import { StoreIcon } from '../StoreIcon/store'
import { USDCircleIcon } from '../USDIcon/usd-circle'
import { CartIcon } from '../CartIcon/cart'
import { Button, BaseLink } from '../Navigation'
import { useAppContext } from '../../context/AppContext'
import { usePathname } from 'next/navigation'
import { useHideOnScroll } from '../../helpers/useHideOnScroll'
import UserMenu from '../Content/UserMenu'
import NavDropdown from './NavDropdown'
import { useState } from 'react'
import { CATEGORIES } from '../../constants/categories'
import { Listbox } from '@headlessui/react'
import { ESteamAppId } from '../../types/Inventory'
import { format } from '../../helpers/numberFormater'
import SearchModal from '../Content/SearcModal'
import { gamesLinks } from '../../constants/games'
import MobileNavBar from '../Navigation/MobileNavBar'
import LogoSmall from '../icons/top-bar/LogoSmall'
import LogoSkinwallet from '../icons/top-bar/LogoSkinwallet'
import SearchIcon from '../icons/top-bar/SearchIcon'
import Link from 'next/link'
import { useCartContext } from '@/context/CartContext'
import AddedToCartModal from '../modals/AddedToCartModal'

interface ITopBar {
  isHidableOnScroll: boolean
}

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const TopBar = ({ isHidableOnScroll }: ITopBar) => {
  const pathname = usePathname()
  const shouldHide = useHideOnScroll()
  const {
    changeSearchState,
    user,
    gameId,
    searchOpened,
    updateGameId
  } = useAppContext()
  const [, setSelected] = useState('')
  const [isOpenNavBar, setIsOpenNavBar] = useState(false)
  const { cartItems } = useCartContext()
  return (
<>
<AddedToCartModal />
    <header
      id="top-bar"
      className={classNames(
        'pointer-events-none cursor-default w-full duration-100 h-[56px] sticky top-0 z-50',
        isHidableOnScroll && shouldHide
          ? 'transform-gpu translate-x-0 lg:translate-y-[-56px] translate-z-0'
          : 'transform-gpu translate-x-0 translate-y-0 translate-z-0'
      )}
    >
      <div
        className={classNames(
          'max-w-[1440px] min-w-full z-[60] flex items-center justify-between w-full h-[56px] px-[24px] py-[12px]  pointer-events-auto bg-almostBlack transition-transform delay-[150ms] ease-in-out'
        )}
      >
        <nav className="flex items-center">
          <Link className='hidden lg:block' href='/market'>
            <LogoSkinwallet />
          </Link>
          <div className='flex lg:hidden items-center gap-3'>
            <div onClick={() => { setIsOpenNavBar(boolean => !boolean) }} className='cursor-pointer'>
              {isOpenNavBar
                ? (
                  <div className='w-6 h-[21px] flex items-center justify-center'>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.2391 14.1407L13.977 13.4028L1.43353 0.859375L0.695682 1.59723L13.2391 14.1407Z" fill="white"/>
                      <path d="M1.43353 14.1407L0.695677 13.4028L13.2391 0.859375L13.977 1.59723L1.43353 14.1407Z" fill="white"/>
                    </svg>
                </div>
                  )
                : (
              <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.47119 5.80446V4.76099H21.2103V5.80446H3.47119ZM21.2103 9.97838V11.0219H3.47119V9.97838H21.2103ZM3.47119 15.1958H21.2103V16.2392H3.47119V15.1958Z" fill="white"/>
              </svg>)}
            </div>
            <Link href='/market'>
              <LogoSmall />
            </Link>
          </div>
          <NavDropdown wrapperClasses='hidden lg:flex' title={Object.keys(ESteamAppId)[Object.values(ESteamAppId).indexOf(gameId)]} setSelected={setSelected}>
            <div className="flex w-full mx-10 gap-10 flex-wrap">
              {gamesLinks.map((game) => (
                <Listbox.Option
                  key={game.id}
                  className="flex flex-col gap-3 w-[178px] cursor-pointer"
                  onClick={() => { updateGameId(game.id) }}
                  value={game}
                >
                  <div className={classNames('relative w-full', gameId === game.id ? 'border border-swViolet' : '')}>
                    {game.bg
                      ? <Image
                      width={176}
                      height={112}
                      src={game.bg}
                      alt={game.name}
                      className="w-full"
                    />
                      : <div className='w-[176px] h-[112px] bg-gray-500' />}
                    {game.logo
                      ? <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <img src={game.logo} alt={game.name} />
                    </div>
                      : ''}
                  </div>
                  <div className='uppercase text-base text-graySecondary font-Barlow font-light'>
                    {game.name}
                  </div>
                  <div className='text-graySecondary text-sm font-Barlow font-light'>
                    {game.description}
                  </div>
                </Listbox.Option>
              ))}
            </div>
          </NavDropdown>
          <div className="p-0 border-l border-white h-[32px] opacity-10 mx-4 hidden lg:block"></div>
          <BaseLink
            href="/market"
            className="hidden lg:flex font-medium text-skinwallerGray hover:text-white"
            wrapperStyles="h-[56px]"
            text="buy"
            icon
            active={pathname.includes('/market')}
            withBorder
          >
            <StoreIcon />
          </BaseLink>
          <BaseLink
            href="/panel/deposit"
            className="hidden lg:flex font-medium text-skinwallerGray hover:text-white w-max"
            wrapperStyles="h-[56px]"
            text="instant sell"
            icon
            active={pathname.includes('/deposit')}
            withBorder
          >
            <USDCircleIcon />
          </BaseLink>
        </nav>
        <nav className="flex items-center">
          <NavDropdown wrapperClasses='hidden lg:flex ' title="categories" setSelected={setSelected}>
            <div className="grid grid-cols-categories max-w-[1124px] mx-auto">
              {Object.values(CATEGORIES).map((ctegory) => (
                <div className="mb-5" key={ctegory.name}>
                  {ctegory.name !== 'rest'
                    ? (
                    <div className="flex flex-col gap-2">
                      <Listbox.Option value={ctegory.name}>
                        <span className="uppercase text-white hover:text-graySecondary button">
                          {ctegory.name}
                        </span>
                      </Listbox.Option>
                      <div className="flex flex-col gap-1">
                        {ctegory.models.map((obj) => (
                          <Listbox.Option key={obj.name} value={obj.name}>
                            <span className="block text-graySecondary  hover:text-white button  each-capitalized ">
                              {obj.name}
                            </span>
                          </Listbox.Option>
                        ))}
                      </div>
                    </div>
                      )
                    : (
                    <div className="flex flex-col gap-6 pl-4">
                      {ctegory.models.map((obj) => (
                        <Listbox.Option key={obj.name} value={obj.name}>
                          <div className="uppercase text-white hover:text-graySecondary button">
                            {obj.name}
                          </div>
                        </Listbox.Option>
                      ))}
                    </div>
                      )}
                </div>
              ))}
            </div>
          </NavDropdown>
          <Button
            className="hidden lg:flex uppercase font-medium text-skinwallerGray hover:text-white"
            text="search"
            icon={
              <SearchIcon className={classNames('fill-current h-[12px] w-[12px]')}/>
            }
            onClick={changeSearchState}
          />
          <div className="hidden lg:block p-0 border-l border-white h-[32px] opacity-10 mx-4"></div>
          {user
            ? (
              <>
                <div className='relative'>
                  <div className='absolute left-0 top-0 w-full h-full bg-darkSecondary lg:bg-transparent cta-clip-path' />
                  <Button
                    text={`$${format(user.balance)}`}
                    className="uppercase font-medium z-10 relative text-skinwallerGray hover:text-white"
                  />
                </div>
                <BaseLink
                  href="/cart"
                  className="font-medium text-skinwallerGray hover:text-white relative"
                  icon
                >
                  <>
                    {
                      cartItems.items.length > 0 
                        ? <div className='w-4 h-4 rounded-full bg-swOrange font-Barlow text-[12px] text-darkSecondary flex justify-center items-center absolute right-0 -bottom-1'>
                            {cartItems.items.length}
                          </div>
                        : ""
                    }
                    <CartIcon />
                  </>
                </BaseLink>
                <UserMenu name={user.username} balance={user.balance} wrapperClasses='hidden lg:block' />
              </>
              )
            : (
            <>
              <BaseLink
                href="/sign-in"
                className="mr-[20px] font-medium text-skinwallerGray hover:text-white"
                text="Log in"
                active={pathname === '/sign-in'}
              />
              {/* <Link
                to='/sign-up'
                className='font-semibold text-black cta-clip-path bg-white role-button hover:opacity-50'
                text='Sign up'
              /> */}
              <Button
                text="Sign up"
                className="uppercase font-semibold text-black cta-clip-path bg-white role-button hover:opacity-50"
              />
            </>
              )}
        </nav>

      </div>
    </header>
    <SearchModal isOpen={searchOpened} onClose={changeSearchState} />
    <MobileNavBar isOpen={isOpenNavBar} />
    </>
  )
}

export default TopBar
