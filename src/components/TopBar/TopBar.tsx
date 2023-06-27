import { useEffect, useRef, useState } from 'react';
import { ReactComponent as SkinwalletLogo } from '../../assets/logo-skinwallet.inline.svg';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { StoreIcon } from '../StoreIcon/store';
import { USDCircleIcon } from '../USDIcon/usd-circle';
import { CartIcon } from '../CartIcon/cart';
import { Button, Link } from '../Navigation'
import { useAppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';

interface ITopBar {
  isHidableOnScroll: boolean,
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const useHideOnScroll = () => {
  const [isHidden, setIsHidden] = useState(false);
  const prevScrollY = useRef<any>();

  useEffect(() => {
    const onScroll = () => {
      const offset = 60;
      const scrolledDown = window.scrollY > prevScrollY.current;
      const scrolledUp = !scrolledDown;

      if (window.scrollY > offset && scrolledDown && !isHidden) {
        setIsHidden(true);
      } else if (scrolledUp && isHidden) {
        setIsHidden(false);
      }

      prevScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHidden]);

  return isHidden;
};

const TopBar = ({ isHidableOnScroll }: ITopBar) => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(false);
  const shouldHide = useHideOnScroll();
  const {
    changeCategoriesState,
    categoriesState,
    changeSearchState,
    searchOpened,
    changegameSelectorState,
    gameSelectorOpened,
  } = useAppContext();

  return (
    <header id="top-bar" className="pointer-events-none cursor-default w-full h-[56px]">
      <div
        className={classNames(
          'fixed max-w-[1440px] min-w-full z-[666] flex items-center justify-between w-full h-[56px] px-[24px] py-[12px] overflow-hidden pointer-events-auto bg-almostBlack transition-transform delay-[150ms] ease-in-out',
          isHidableOnScroll && shouldHide ? 'transform-gpu translate-x-0 translate-y-[-56px] translate-z-0' : 'transform-gpu translate-x-0 translate-y-0 translate-z-0',
        )}
      >
        <nav className='flex items-center'>
          <Link
            to='/'
            text={<SkinwalletLogo />}
          />
          <Button
            className='uppercase font-medium text-skinwallerGray hover:text-white ml-[14px]'
            text='cs:go'
            icon={
              <Chevron
                className={classNames(
                  'fill-skinwallerGray h-[12px] w-[12px]',
                  gameSelectorOpened ? 'rotate-180' : '',
                )}
              />
            }
            iconRight
            onClick={changegameSelectorState}
          />
          <div className='p-0 border-l border-white h-[32px] opacity-10 mx-4'></div>
          <Link
            to='/buy'
            className='font-medium text-skinwallerGray hover:text-white'
            wrapperStyles='h-[56px]'
            text='buy'
            icon
            active={ pathname.includes('/buy')}
          >
            <StoreIcon />
          </Link>
          <Link
            to='/instant-sell'
            className='font-medium text-skinwallerGray hover:text-white'
            wrapperStyles='h-[56px]'
            text='instant sell'
            icon
            active={ pathname.includes('/instant-sell')}
          >
            <USDCircleIcon />
          </Link>
        </nav>
        <nav className='flex items-center'>
          <Button
            className='uppercase font-medium text-skinwallerGray hover:text-white'
            text='categories'
            icon={
              <Chevron
                className={classNames(
                  'fill-skinwallerGray h-[12px] w-[12px]',
                  categoriesState ? 'rotate-180' : '',
                )}
              />
            }
            iconRight
            onClick={changeCategoriesState}
          />
          <Button
            className='uppercase font-medium text-skinwallerGray hover:text-white'
            text='search'
            icon={
              <SearchIcon
                className={classNames(
                  'fill-skinwallerGray h-[12px] w-[12px]',
                )}
              />
            }
            onClick={changeSearchState}
          />
          <div className='p-0 border-l border-white h-[32px] opacity-10 mx-4'></div>
          {
            user ? 
            <>
              <Button
                text='$821.46'
                className='uppercase font-medium text-skinwallerGray hover:text-white'
              />
              <Link
                to='/cart'
                className='font-medium text-skinwallerGray hover:text-white'
                icon
              >
                <CartIcon />
              </Link>
              <Button
                text='user'
                className='uppercase font-medium text-skinwallerGray hover:text-white'
                icon={
                  <Chevron
                    className={classNames(
                      'fill-skinwallerGray h-[12px] w-[12px]',
                    )}
                  />
                }
                iconRight
                onClick={() => setUser(!user)}
              />
            </>
            : <>
              {/* <Link
                to='/sign-in'
                className='mr-[20px] font-medium text-skinwallerGray hover:text-white'
                text='Log in'
              /> */}
              {/* <Link
                to='/sign-up'
                className='font-semibold text-black cta-clip-path bg-white role-button hover:opacity-50'
                text='Sign up'
              /> */}
              <Button
                text='log in'
                className='uppercase mr-[20px] font-medium text-skinwallerGray hover:text-white'
                onClick={() => setUser(!user)}
              />
              <Button
                text='Sign up'
                className='uppercase font-semibold text-black cta-clip-path bg-white role-button hover:opacity-50'
              />
            </>
          }
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
