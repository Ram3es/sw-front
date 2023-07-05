import { ReactComponent as SkinwalletLogo } from '../../assets/logo-skinwallet.inline.svg';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { StoreIcon } from '../StoreIcon/store';
import { USDCircleIcon } from '../USDIcon/usd-circle';
import { CartIcon } from '../CartIcon/cart';
import { Button, Link } from '../Navigation'
import { useAppContext } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';
import { useHideOnScroll } from '../../helpers/useHideOnScroll';
import { USER } from '../../mock/user';
import UserMenu from '../Content/UserMenu';

interface ITopBar {
  isHidableOnScroll: boolean,
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const TopBar = ({ isHidableOnScroll }: ITopBar) => {
  const { pathname } = useLocation();
  const shouldHide = useHideOnScroll();
  const {
    changeCategoriesState,
    categoriesState,
    changeSearchState,
    changegameSelectorState,
    gameSelectorOpened,
    user,
    userUpdate
  } = useAppContext();

  return (
    <header id="top-bar" className={classNames("pointer-events-none cursor-default w-full duration-100 h-[56px] sticky top-0 z-40",
    isHidableOnScroll && shouldHide ? 'transform-gpu translate-x-0 translate-y-[-56px] translate-z-0' : 'transform-gpu translate-x-0 translate-y-0 translate-z-0')}>
      <div
        className={classNames(
          'max-w-[1440px] min-w-full z-[666] flex items-center justify-between w-full h-[56px] px-[24px] py-[12px]  pointer-events-auto bg-almostBlack transition-transform delay-[150ms] ease-in-out',
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
                text={user.balance.toString()}
                className='uppercase font-medium text-skinwallerGray hover:text-white'
              />
              <Link
                to='/cart'
                className='font-medium text-skinwallerGray hover:text-white'
                icon
              >
                <CartIcon />
              </Link>
              <UserMenu name={user.username} balance={user.balance} />
    
              {/* <Button
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
                onClick={() => userUpdate()}
              /> */}
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
                onClick={() => userUpdate(USER)}
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
