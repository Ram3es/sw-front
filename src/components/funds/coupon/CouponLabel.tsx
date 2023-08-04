import React from 'react'
import RoundedPlus from '../../icons/RoundedPlus'

const CouponLabel = ({ submitFn }: { submitFn: () => void }) => {
  return (
        <div onClick={() => { submitFn() }} className='flex items-center py-1 gap-2 text-sm text-graySecondary hover:text-white duration-200 cursor-pointer  '>
            <div className=''>
              <RoundedPlus />
            </div>
            <div className='uppercase leading-[1px]  tracking-[1.12px]'>add coupon code</div>
        </div>
  )
}

export default CouponLabel
