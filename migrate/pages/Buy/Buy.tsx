import Bar from '../../components/Bar/Bar'
import { Outlet } from 'react-router-dom'

export default function Buy () {
  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-Barlow text-[21px] font-medium'>MARKET</h1>
        </div>
      </Bar>
      <Outlet />
    </>
  )
}
