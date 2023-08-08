import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModalWrapper from '../../containers/Modal'
import PopupWrapper from '../../containers/PopupWrapper'
import ErrorLabelRounded from '../funds/ErrorLabelRounded'
import { Button } from '../Navigation'
import Checkbox from '../Content/Checkbox'

const TakePrecautionModal = ({ submitFn }: { submitFn: () => void }) => {
  const [isChecked, setIsChecked] = useState(false)
  return (
        <ModalWrapper className='flex justify-center items-center'>
          <PopupWrapper wrapperClasses='w-full max-w-[334px] sm:max-w-[640px]'>
            <div className=' flex flex-col gap-4'>
              <ErrorLabelRounded
                message='take precautions!'
                className='text-sm bg-swOrange'
                isError
              />
              <h1 className=' font-semibold text-22 sm:text-2xl  tracking-[1.1px] sm:tracking-[1.2px] uppercase'>{'Ensure that the Bot\'s Name, Steam Level, Creation Date and Security Token match the information provided.'}</h1>
              <ul className='list-disc pl-4 flex flex-col gap-4 font-normal [&_span]:font-semibold'>
                <li>{'If anything doesn\'t match, '}<span>DECLINE THE TRADE</span>.</li>
                <li>
                   If you receive more than one offer, <span>DECLINE THE TRADE</span>.
                   <p>We only send one trade offer per transaction.</p>
                </li>
                <li>If you see any discrepancies, <span>YOUR ACCOUNT IS COMPROMISED</span>.</li>
              </ul>
              <span className='font-normal'>If you suspect that your account is compromised,
                <Link
                  to={'/'}
                  className='underline hover:no-underline ml-0.5'
                >
                  clear your API
                </Link>,
                <Link
                  to={'/'}
                  className='underline hover:no-underline mx-0.5'
                >
                  change your Steam password
                </Link>
                 and
                <Link
                  to={'/'}
                  className='underline hover:no-underline mx-0.5'
                >
                deauthorize other devices
                </Link>
                .
              </span>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-6 mt-10'>
                <div
                  onClick={() => { setIsChecked(boolean => !boolean) }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    checked={isChecked}
                    activeClass='border border-darkSecondary'
                  />
                  <span>Don’t show again</span>
                </div>
                <Button
                  text='continue'
                  onClick={submitFn}
                  className='w-full sm:w-max justify-center items-start text-white leading-[18px]  bg-darkSecondary uppercase text-base sm:text-lg [&>.text]:mb-0.5 small-caps cta-clip-path'
                  heightClass='h-10'
                />
              </div>
            </div>
          </PopupWrapper>
        </ModalWrapper>
  )
}

export default TakePrecautionModal
