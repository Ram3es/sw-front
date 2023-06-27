import { Link } from '../../../components/Navigation'

export const Nav = () => {
  return (
    <div className='flex items-center'>
      <Link 
        to='.'
        text='your inventory'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
      />
      <Link 
        to='payout'
        text='payout'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
      />
      <Link 
        to='bonus'
        text='bonus'
        className='uppercase font-medium text-skinwallerGray hover:text-white'
        wrapperStyles='h-[50px]'
      />
    </div>
  );
};