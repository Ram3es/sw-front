import Bar from '../../components/Bar/Bar'
import { ReactComponent as GiftIcon } from '../../assets/img/profile/gift-icon.svg'
import { NavLink } from 'react-router-dom'
import Readme from './readme/Readme'

const AddFunds = () => {
  return (
    <>
      <Bar>
        <div className="flex justify-between items-center h-full px-6">
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium uppercase'>
            Add Funds
          </h1>
        </div>
      </Bar>
      <header className='w-full flex items-center h-12 border-b border-darkGrey mt-5 px-6' >
        <NavLink
          to={'/'}
          className='flex items-center gap-2.5 ml-auto text-sm text-graySecondary uppercase  hover:text-white button'>
          <GiftIcon />
          <span className='uppercase tracking-[1.12px]' >redeem gift card</span>
        </NavLink>
      </header>
      <div className='w-full flex justify-center px-2 py-12'>
          <div className='w-full max-w-[672px] flex flex-col gap-12'>
            <Readme />
          </div>
        </div>
    </>
  )
}

export default AddFunds
