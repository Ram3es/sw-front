import { usePathname } from 'next/navigation'
import { BaseLink } from '../Navigation'


export const Nav = () => {
  const pathname = usePathname()

  return (
    <div className='flex items-center w-full h-max border-b xl:border-0 mb-4 xl:mb-0 border-solid border-darkGrey'>
      <BaseLink
        href='/panel/deposit'
        text='your inventory'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/panel/deposit' }
        withBorder
      />
      <BaseLink
        href='/panel/deposit/payout'
        text='payout'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/panel/deposit/payout' }
        withBorder
      />
      <BaseLink
        href='/panel/deposit/bonus'
        text='bonus'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/panel/deposit/bonus' }
        withBorder
      />
    </div>
  )
}
