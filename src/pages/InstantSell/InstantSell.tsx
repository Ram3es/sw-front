import Bar from '../../components/Bar/Bar'
import { Outlet } from 'react-router-dom'

export default function InstantSell () {
  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium'>INSTANT SELL</h1>
        </div>
      </Bar>
        <Outlet />
    </>
  )
}
