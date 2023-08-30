
import { classNames } from '../../helpers/className'
import { BaseLink } from './BaseLink'
import { usePathname } from 'next/navigation'
import { StoreIcon } from '../StoreIcon/store'
import { USDCircleIcon } from '../USDIcon/usd-circle'
import DropdownGames from '../header/mobile/DropdownGames'
import DropdownCategories from '../header/mobile/DropdownCategories'
import DropdownUserMenu from '../header/mobile/DropdownUserMenu'
import Image from 'next/image'

const MobileNavBar = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname()
  return (
        <div className={classNames('w-full h-[calc(100%_-_54px)] flex flex-col fixed lg:hidden z-50 top-14 duration-100 bg-almostBlack overflow-y-scroll',
          isOpen ? 'left-0' : '-left-full')}>
            <div className='w-full flex items-center justify-between  p-6 border-y border-darkGrey text-graySecondary cursor-pointer' >
                <span className='text-lg uppercase tracking-[1.44px]'>search</span>
                <Image
                  src="/search-icon.svg"
                  alt="search-icon"
                  width={18}
                  height={18}
                />
            </div>
            <div className='flex flex-col gap-5 py-5'>
              <BaseLink
                href="/market"
                text="buy"
                className="px-6 text-lg font-medium text-skinwallerGray hover:text-white [&>span]:pr-3 "
                wrapperStyles="h-[18px] mx-[0px]"
                borderStyle=' border-l-2 border-swViolet'
                icon
                active={pathname.includes('/market')}
                withBorder
              >
                <StoreIcon className='w-4 h-auto' />
              </BaseLink>
              <BaseLink
                href="/panel/deposit"
                text="instant sell"
                className="px-6 text-lg font-medium text-skinwallerGray hover:text-white [&>span]:pr-3"
                wrapperStyles="h-[18px] mx-[0px]  "
                borderStyle=' border-l-2 border-swViolet'
                icon
                active={pathname.includes('/deposit')}
                withBorder
              >
                <USDCircleIcon className='w-4 h-auto' />
              </BaseLink>
            </div>
            <div className=' flex flex-col gap-5 py-8 mx-6 border-y border-darkGrey '>
                <DropdownGames />
                <DropdownCategories />
            </div>
            <DropdownUserMenu/>
        </div>
  )
}

export default MobileNavBar
