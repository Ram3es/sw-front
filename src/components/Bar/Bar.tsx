import { useRef, useState, useEffect } from 'react'

interface IBar {
  children?: string | JSX.Element | JSX.Element[]
}

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const useOnScroll = () => {
  const [isHidden, setIsHidden] = useState(false)
  const prevScrollY = useRef<any>()

  useEffect(() => {
    const onScroll = () => {
      const offset = 60
      const scrolledDown = window.scrollY > prevScrollY.current
      const scrolledUp = !scrolledDown

      if (window.scrollY > offset && scrolledDown && !isHidden) {
        setIsHidden(true)
      } else if (scrolledUp && isHidden) {
        setIsHidden(false)
      }

      prevScrollY.current = window.scrollY
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isHidden])

  return isHidden
}

export default function Bar ({ children }: IBar) {
  const isTopBarHidden = useOnScroll()

  return (
    <div className={classNames('pointer-events-none cursor-default w-full sticky z-30 duration-100', isTopBarHidden ? 'top-0 transform-gpu translate-x-0 translate-z-0' : 'top-[56px]')}>
      <div className={classNames(
        'flex max-w-[1440px] min-w-full h-[64px] bg-darkGrey z-30 transition-transform delay-[150ms] ease-in-out',
        isTopBarHidden ? 'transform-gpu translate-x-0 translate-z-0' : ''
      )}>
        <div className={classNames('w-full h-full relative z-10', isTopBarHidden ? '' : 'pt-[10px]')}>
          { children }
        </div>
        <div className={classNames('absolute left-0 top-full w-2/5 h-5 bg-darkGrey', isTopBarHidden ? 'transform-gpu translate-x-0 translate-y-[-20px] translate-z-0' : '')}>
          <div className='absolute left-full bottom-0 w-5 h-[30px] bg-darkGrey rotate-45 -translate-x-[6px] -translate-y-[3px]' />
        </div>
      </div>
    </div>
  )
}
