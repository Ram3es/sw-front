import Link from 'next/link'
import ErrorLabelRounded from '../funds/ErrorLabelRounded'
import ModalWrapper from '../../containers/Modal'
import PopupWrapper from '../../containers/PopupWrapper'
import { Button } from '../Navigation'
import ReloadIcon from '../icons/ReloadIcon'

interface ITradeModal {
  submitFn: () => void
  cancelFn: () => void
}

const TradeOffersDeclinedModal = ({ submitFn, cancelFn }: ITradeModal) => {
  return (
    <ModalWrapper className='flex justify-center items-center'>
        <PopupWrapper wrapperClasses='w-full max-w-[334px] sm:max-w-[640px]'>
          <div className=' flex flex-col gap-4'>
            <ErrorLabelRounded
              message='trade offer declined!'
              className='text-sm bg-swOrange'
              isError
            />
            <h1 className=' font-semibold text-22 sm:text-2xl  tracking-[1.1px] sm:tracking-[1.2px] uppercase'>{'Our Bot\'s trade offer has been declined on your side. If this was intentional, please ignore this message.'}</h1>
            <ul className='list-disc pl-4 flex flex-col gap-4 font-normal [&_span]:font-semibold'>
                <li>{'If you didn\'t decline our trade'}<span> YOUR ACCOUNT IS COMPROMISED</span>.</li>
            </ul>
            <span className='font-normal'>Change your
                <Link
                  href={'/'}
                  className='underline hover:no-underline ml-0.5'
                >
                  Steam Password
                </Link>,
                <Link
                  href={'/'}
                  className='underline hover:no-underline mx-0.5'
                >
                   create a new trade URL
                </Link>,
                <Link
                  href={'/'}
                  className='underline hover:no-underline mx-0.5'
                >
                 deauthorize other devices
                </Link>
                and
                <Link
                  href={'/'}
                  className='underline hover:no-underline mx-0.5'
                >
                 and revoke Steam API key
                </Link>
                  or contact support for assistance.
              </span>
              <div className='w-full flex flex-col sm:flex-row justify-center items-center  gap-6 sm:gap-3 mt-10 sm:mt-14'>
              <div className=' flex items-center gap-3 cursor-pointer'>
                <ReloadIcon className='shrink-0' />
                <span className='text-sm uppercase tracking-[1.12px] shrink-0'> resend trade offer</span>
              </div>
              <div className='w-full flex flex-col-reverse sm:flex-row justify-end items-center gap-3 sm:gap-4 '>
                <Button
                    text='cancel'
                    onClick={cancelFn}
                    className='w-full sm:w-max justify-center  border border-darkSecondary uppercase relative small-caps text-lg hover:opacity-75 cta-clip-path'
                    heightClass='h-10'
                >
                    <span className="absolute  -left-[2px] bottom-[2px] w-[12px] rotate-45 border-t border-darkSecondary overflow-hidden" />
                </Button>
                <Button
                    text='contact support'
                    onClick={submitFn}
                    className='w-full sm:w-max justify-center items-start text-white leading-[18px]  bg-darkSecondary uppercase text-lg [&>.text]:mb-0.5 small-caps hover:opacity-80 cta-clip-path'
                    heightClass='h-10'
                />
                </div>
              </div>
          </div>
        </PopupWrapper>
    </ModalWrapper>
  )
}

export default TradeOffersDeclinedModal
