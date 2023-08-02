import React from 'react'
import Kinguin from '../../../assets/img/funds/kinguin.png'

const GiftContent = () => {
  return (
        <div className='flex flex-col gap-4 mt-5'>
          <div className='flex flex-col gap-2 marked-list text-white'>
            <p>No initial verification</p>
            <p>Top-up limit not applicable</p>
            <p>Fast and easy to use</p>
            <p>0% fee</p>
          </div>
          <div className='flex flex-col' >
            <span className='text-xs leading-3 font-normal text-graySecondary'>Buy Gift Cards from our partner</span>
            <img src={Kinguin} alt='kinguin ' className='w-32 h-auto -translate-x-3 pt-1 pb-2' />
          </div>

        </div>
  )
}

export default GiftContent
