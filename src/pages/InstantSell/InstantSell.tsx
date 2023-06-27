import Bar from '../../components/Bar/Bar';
import { Button, Link } from '../../components/Navigation'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'
import { Outlet, useLocation } from 'react-router-dom';
import { Nav } from './controls/nav';
import { Filters } from './controls/filters';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function InstantSell() {
  const location = useLocation();
  console.log('location :>> ', location);
  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium'>INSTANT SELL</h1>
        </div>
      </Bar>
      <div className='flex flex-grow'>
        <div className='flex flex-col flex-grow'>
          <div className='flex justify-between h-[50px] border-b border-solid border-sidebarGrey px-[8px]'>
            <Nav />
            <Filters />
          </div>
          <div className='px-[24px] py-[30px] h-9'>
            <Outlet />
          </div>
        </div>
        <div className='sticky top-[60px] flex flex-col max-w-[429px] w-full h-[400px] side-bar-gradient'></div>
      </div>
    </>
  )
}