import React from 'react'
import MethodFee from './MethodFee'
import { Link } from 'react-router-dom'
import { format } from '../../../helpers/numberFormater'

const PayPalContent = () => {
  return (
        <div className='flex flex-col gap-2'>
          <MethodFee topUpFee={`2.5% + $${format(10)}`} />
          <div>
            <p>Make sure you have a verified PayPal account, otherwise your payment won’t be accepted.</p>
            <Link
              to='https://www.paypal.com/us/smarthelp/article/how-do-i-verify-my-paypal-account-faq444'
              className=' underline hover:no-underline'
            >
              Read how to perform the verification process.
            </Link>
          </div>
        </div>
  )
}

export default PayPalContent
