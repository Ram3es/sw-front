import { useRef, useState, useEffect } from 'react';

interface IBar {
  children?: string | JSX.Element | JSX.Element[]; 
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const useOnScroll = () => {
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

export default function Bar({ children }: IBar) {
  const isTopBarHidden = useOnScroll();

  return (
    <div className={classNames(
      'fixed flex max-w-[1440px] min-w-full h-20 bg-darkGrey bar-clip-path transition-transform delay-[150ms] ease-in-out',
      isTopBarHidden ? 'transform-gpu translate-x-0 translate-y-[-60px] translate-z-0' : ''
    )}>
      { children }
    </div>
  );
}