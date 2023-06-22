import { useEffect, useRef, useState } from 'react';
import { ReactComponent as SkinwalletLogo } from './images/logo-skinwallet.inline.svg';
import { ReactComponent as SearchIcon } from './images/search-icon.svg'
import { ReactComponent as Chevron } from './images/chevron-down.svg'
import { Button } from './Link/Link';

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
  const shouldHide = useHideOnScroll();

  return (
    <header id="top-bar" className="pointer-events-none cursor-default w-full h-[56px]">
      <div
        className={classNames(
          'fixed max-w-[1440px] min-w-full z-[666] flex items-center justify-between w-full h-[56px] px-[24px] py-[12px] overflow-hidden pointer-events-auto bg-almostBlack transition-transform delay-[150ms] ease-in-out',
          isHidableOnScroll && shouldHide ? 'transform-gpu translate-x-0 translate-y-[-56px] translate-z-0' : 'transform-gpu translate-x-0 translate-y-0 translate-z-0',
        )}
      >
        <nav className='flex'>
          <a href='/market' id='topbar-logo-button' className="relative block w-[26px] h-[26px] overflow-hidden outline-none appearance-none sm-viewport:w-[140px]" aria-label="Skinwallet" role="button">
            <SkinwalletLogo class='absolute p-0 top-0 right-[-1px]' />
          </a>
          <Button
            className='font-medium text-skinwallerGray hover:text-white ml-[14px]'
            text='cs:go'
            icon={<Chevron className='fill-skinwallerGray h-[12px] w-[12px]'/>}
            iconRight
          />
          <div className='p-0 border-l border-white h-[32px] opacity-10 mx-4'></div>
          <Button
            to='/buy'
            className='font-medium text-skinwallerGray hover:text-white'
            text='buy'
            icon={<SearchIcon className='fill-skinwallerGray h-[12px] w-[12px]' />}
          />
          <Button
            to='/instant-sell'
            className='font-medium text-skinwallerGray hover:text-white'
            text='instant sell'
            icon={<SearchIcon className='fill-skinwallerGray h-[12px] w-[12px]' />}
          />
        </nav>
        <nav className='flex'>
          <Button
            className='font-medium text-skinwallerGray hover:text-white'
            text='categories'
            icon={<Chevron className='fill-skinwallerGray h-[12px] w-[12px]'/>}
            iconRight
          />
          <Button
            className='font-medium text-skinwallerGray hover:text-white'
            text='search'
            icon={<SearchIcon className='fill-skinwallerGray h-[12px] w-[12px]' />}
          />
          <div className='p-0 border-l border-white h-[32px] opacity-10 mx-4'></div>
          <Button
            to='/sign-in'
            className='mr-[20px] font-medium text-skinwallerGray hover:text-white'
            text='Log in'
          />
          <Button
            to='/sign-up'
            className='font-semibold text-black cta-clip-path bg-white role-button hover:opacity-50'
            text='Sign up'
          />
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
