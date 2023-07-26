import { useLocation } from 'react-router-dom'
import { Link } from '../../../components/Navigation'

export const Nav = () => {
  const { pathname } = useLocation()

  return (
    <div className='flex items-center'>
      <Link
        to='/panel/deposit'
        text='your inventory'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/deposit' }
        withBorder
      />
      <Link
        to='/panel/deposit/payout'
        text='payout'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/deposit/payout' }
        withBorder
      />
      <Link
        to='/panel/deposit/bonus'
        text='bonus'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
        active={ pathname === '/deposit/bonus' }
        withBorder
      />
    </div>
  )
}
