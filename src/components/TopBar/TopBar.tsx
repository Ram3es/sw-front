import { ReactComponent as SkinwalletLogo } from '../../assets/logo-skinwallet.inline.svg'
import { ReactComponent as SkinwalletLogoSmall } from '../../assets/logo-small.svg'
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'

import { StoreIcon } from '../StoreIcon/store'
import { USDCircleIcon } from '../USDIcon/usd-circle'
import { CartIcon } from '../CartIcon/cart'
import { Button, Link } from '../Navigation'
import { useAppContext } from '../../context/AppContext'
import { useLocation } from 'react-router-dom'
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

interface ITopBar {
  isHidableOnScroll: boolean
}

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const TopBar = ({ isHidableOnScroll }: ITopBar) => {
  const { pathname } = useLocation()
  const shouldHide = useHideOnScroll()
  const {
    changeSearchState,
    user,
    gameId,
    searchOpened,
    updateGameId
  } = useAppContext()
  const [, setSelected] = useState('')

  return (
<>
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
          <a className='hidden lg:block' href={window.location.origin}>
            <SkinwalletLogo />
          </a>
          <div className='flex lg:hidden items-center gap-3'>
            <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.47119 5.80446V4.76099H21.2103V5.80446H3.47119ZM21.2103 9.97838V11.0219H3.47119V9.97838H21.2103ZM3.47119 15.1958H21.2103V16.2392H3.47119V15.1958Z" fill="white"/>
            </svg>
            <a href={window.location.origin}>
              <SkinwalletLogoSmall />
            </a>
          </div>
          <NavDropdown wrapperClasses='hidden lg:flex' title={Object.keys(ESteamAppId)[Object.values(ESteamAppId).indexOf(gameId)]} setSelected={setSelected}>
            <div className="flex w-full mx-10 gap-10 flex-wrap">
              {gamesLinks.map((game) => (
                <div
                  key={game.id}
                  className="flex flex-col gap-3 w-[178px] cursor-pointer"
                  onClick={() => { updateGameId(game.id) }}
                >
                  <div className={ classNames('relative w-full', gameId === game.id ? 'border border-swViolet' : '')}>
                    {game.bg
                      ? <img className="w-full" src={game.bg} alt={game.name} />
                      : <div className='w-[176px] h-[112px] bg-gray-500' />}
                    {game.logo
                      ? <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <img src={game.logo} alt={game.name} />
                    </div>
                      : ''}
                  </div>
                  <div className='uppercase text-base text-graySecondary font-["Barlow"] font-light'>
                    {game.name}
                  </div>
                  <div className='text-graySecondary text-sm font-["Barlow"] font-light'>
                    {game.description}
                  </div>
                </div>
              ))}
            </div>
          </NavDropdown>
          <div className="p-0 border-l border-white h-[32px] opacity-10 mx-4 hidden lg:block"></div>
          <Link
            to="/market"
            className="hidden lg:flex font-medium text-skinwallerGray hover:text-white"
            wrapperStyles="h-[56px]"
            text="buy"
            icon
            active={pathname.includes('/market')}
            withBorder
          >
            <StoreIcon />
          </Link>
          <Link
            to="/panel/deposit"
            className="hidden lg:flex font-medium text-skinwallerGray hover:text-white"
            wrapperStyles="h-[56px]"
            text="instant sell"
            icon
            active={pathname.includes('/deposit')}
            withBorder
          >
            <USDCircleIcon />
          </Link>
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
              <SearchIcon
                className={classNames('fill-skinwallerGray h-[12px] w-[12px]')}
              />
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
                <Link
                  to="/panel/cart"
                  className="font-medium text-skinwallerGray hover:text-white"
                  icon
                >
                  <CartIcon />
                </Link>
                <UserMenu name={user.username} balance={user.balance} wrapperClasses='hidden lg:block' />
              </>
              )
            : (
            <>
              <Link
                to="/sign-in"
                className="mr-[20px] font-medium text-skinwallerGray hover:text-white"
                text="Log in"
                state={{ from: pathname }}
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
    </>
  )
}

export default TopBar
