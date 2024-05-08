
import Dropbox from '../Content/Dropbox'

import { classNames } from '../../helpers/className'
import Link from 'next/link'

export const NoticeContent = ({ className }: { className?: string }) => (
    <div className={classNames(' flex-col gap-4 mb-2 max-w-[388px] [&>p>span]:text-white [&>p>span]:font-medium ',
      className ?? '')}>
      <p>Make sure you have a
        <span> verified PayPal account</span>, otherwise your payment won’t be accepted.
        <Link
          href={'/'}
          className='text-skinwalletPink font-medium underline hover:no-underline ml-1'
        >
          Read how to perform the verification process.
        </Link>
      </p>
      <p>Only the payments from
        <span> verified accounts </span>
          will be accepted. Transfer verification
        <span> may take longer </span> than usual.
      </p>
      <p>You will be redirected to Conotoxia Pay website, where you can finish the transaction.</p>
    </div>
)

export const ImportantNotice = ({ className }: { className?: string }) => {
  return (
        <Dropbox
          label='IMPORTANT NOTICE'
          additionalClasses={classNames('w-max flex items-center gap-2 uppercase text-graySecondary text-sm  tracking-[1.12px] hover:text-white duration-200 cursor-pointer',
            className ?? '')}
        >
          <NoticeContent className=' flex sm:hidden mt-4' />
        </Dropbox>
  )
}
