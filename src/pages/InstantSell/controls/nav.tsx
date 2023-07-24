import { useLocation } from 'react-router-dom'
import { Link } from '../../../components/Navigation'

export const Nav = () => {
  const { pathname } = useLocation()

  return (
    <div className='flex items-center'>
      <Link
        to='/panel/instant-sell'
        text='your inventory'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/instant-sell' }
        withBorder
      />
      <Link
        to='/panel/instant-sell/payout'
        text='payout'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/instant-sell/payout' }
        withBorder
      />
      <Link
        to='/panel/instant-sell/bonus'
        text='bonus'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/instant-sell/bonus' }
        withBorder
      />
    </div>
  )
}
