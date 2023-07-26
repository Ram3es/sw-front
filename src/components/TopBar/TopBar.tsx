import { ReactComponent as SkinwalletLogo } from '../../assets/logo-skinwallet.inline.svg'
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'
import csgoBg from '../../assets/img/top-bar/csgo-bg.png'
import csgoLogo from '../../assets/img/top-bar/csgo-logo.svg'
import dotaBg from '../../assets/img/top-bar/dota-bg.png'
import dotaLogo from '../../assets/img/top-bar/dota-logo.png'
import tf2Bg from '../../assets/img/top-bar/tf2-bg.png'
import tf2Logo from '../../assets/img/top-bar/tf2-logo.svg'

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
  const gamesLinks = [
    {
      name: 'CS:GO',
      bg: csgoBg,
      logo: csgoLogo,
      id: ESteamAppId.CSGO,
      description: 'The best knives, the coolest rifles, and many more skins!'
    }, {
      name: 'Dota 2',
      bg: dotaBg,
      logo: dotaLogo,
      id: ESteamAppId.DOTA2,
      description: 'Awesome wearables, bundles, gems, and more!'
    }, {
      name: 'Team Fortress 2',
      bg: tf2Bg,
      logo: tf2Logo,
      id: ESteamAppId.TF2,
      description: "Wearables! Armor! Weapons! We got'em all!"
    }
  ]

  return (
<>
    <header
      id="top-bar"
      className={classNames(
        'pointer-events-none cursor-default w-full duration-100 h-[56px] sticky top-0 z-40',
        isHidableOnScroll && shouldHide
          ? 'transform-gpu translate-x-0 translate-y-[-56px] translate-z-0'
          : 'transform-gpu translate-x-0 translate-y-0 translate-z-0'
      )}
    >
      <div
        className={classNames(
          'max-w-[1440px] min-w-full z-[60] flex items-center justify-between w-full h-[56px] px-[24px] py-[12px]  pointer-events-auto bg-almostBlack transition-transform delay-[150ms] ease-in-out'
        )}
      >
        <nav className="flex items-center">
          <Link to={window.location.origin} text={<SkinwalletLogo />} />
          <NavDropdown title={Object.keys(ESteamAppId)[Object.values(ESteamAppId).indexOf(gameId)]} setSelected={setSelected}>
            <div className="flex w-full mx-10 gap-10 flex-wrap">
              {gamesLinks.map((game) => (
                <div
                  key={game.id}
                  className="flex flex-col gap-3 w-[178px] cursor-pointer"
                  onClick={() => { updateGameId(game.id) }}
                >
                  <div className={ classNames('relative w-full', gameId === game.id ? 'border border-swViolet' : '')}>
                    <img className="w-full" src={game.bg} alt={game.name} />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <img src={game.logo} alt={game.name} />
                    </div>
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
          <div className="p-0 border-l border-white h-[32px] opacity-10 mx-4"></div>
          <Link
            to="/market"
            className="font-medium text-skinwallerGray hover:text-white"
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
            className="font-medium text-skinwallerGray hover:text-white"
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
          <NavDropdown title="categories" setSelected={setSelected}>
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
            className="uppercase font-medium text-skinwallerGray hover:text-white"
            text="search"
            icon={
              <SearchIcon
                className={classNames('fill-skinwallerGray h-[12px] w-[12px]')}
              />
            }
            onClick={changeSearchState}
          />
          <div className="p-0 border-l border-white h-[32px] opacity-10 mx-4"></div>
          {user
            ? (
              <>
                <Button
                  text={`$${format(user.balance)}`}
                  className="uppercase font-medium text-skinwallerGray hover:text-white"
                />
                <Link
                  to="/panel/cart"
                  className="font-medium text-skinwallerGray hover:text-white"
                  icon
                >
                  <CartIcon />
                </Link>
                <UserMenu name={user.username} balance={user.balance} />
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
