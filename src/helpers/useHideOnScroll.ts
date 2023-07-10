import { useEffect, useRef, useState } from 'react'

export const useHideOnScroll = () => {
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
