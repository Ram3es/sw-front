'use client'
import Avatar from '../../../components/Content/Avatar'
import SteamIcon from '../../../components/icons/SteamIcon'
import InformationIcon from '../../../components/icons/InformationIcon'
import SettingField from '../../../containers/SettingField'
import ErrorLabelRounded from '../../../components/funds/ErrorLabelRounded'
import EditPencil from '../../../components/icons/EditPencil'
import { type IUser } from '../../../types/User'
import UnlinkIcon from '@/components/icons/settings/UnlinkIcon'
import ExternalLink from '@/components/icons/settings/ExternalLink'
import SuccessLabel from '@/components/Content/SuccessLabel'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'

const SteamSettings = () => {
  const { user } = useAppContext()
  const data = undefined

  const editFn = () => {
    console.log('navigate')
  }
  return (
    <div className='w-full border border-darkGrey'>
      <div className=' flex items-center h-14 px-3 sm:px-6 py-3 bg-darkGrey relative'>
        <div className='w-[calc(100%_-_144px)] sm:w-2/3 flex items-center gap-3 text-lg text-white'>
          <Avatar url={user?.avatar } />
          <span className='w-full truncate'>{user?.username}</span>
        </div>
        <div className='w-36 sm:w-1/3 absolute z-0 ml-auto inset-0 flex items-center justify-center text-white bg-darkBlue'>
          <div className='flex items-center gap-2'>
            <SteamIcon className='w-6 h-6' />
            <span className=' text-lg small-caps mb-0.5 ml-1 tracking-[1.44px]'>steam</span>
            <InformationIcon iconClasses='w-[14px] h-auto' />
          </div>
        </div>
      </div>
      <SettingField
        title='steam trade url'
        wrapperClasses='bg-darkSecondary'
        editableFn={data && editFn}
      >{ data
        ? <SuccessLabel message='provided' />
        : (
            <div className='flex flex-col gap-5 text-graySecondary text-sm'>
              <ErrorLabelRounded
                message='not provided'
                icon={<UnlinkIcon/>}
                isError
              />
              <p>Trade URL is required to receive trade offers on your Steam Account for selling and withdrawing items.</p>
              <div className=' w-max flex items-center gap-2 hover:text-white cursor-pointer duration-200'>
               <Link href='/settings/trade-url'>
                  <EditPencil className='w-[18px] h-[18px] ' />
               </Link>
               <span className='tracking-[1.12px] uppercase'>add trade url</span>
              </div>
            </div>
          )
      }
      </SettingField>
      <div className='border-b border-darkGrey my-6 mx-3 sm:mx-6' />
      <SettingField
        title='steam guard mobile
        Authenticator'
        wrapperClasses='bg-darkSecondary [&_span]:leading-5'
      >
        {data
          ? <SuccessLabel message='enabled' />
          : (
            <div className='flex flex-col gap-5 text-graySecondary text-sm'>
              <ErrorLabelRounded
                message='not enabled'
                isError
              />
              <p>Your Steam account must be protected by Steam Guard Mobile Authenticator for at least 15 days.</p>
              <p>In order for us to trade with you without restrictions, it is required that your Steam Guard Mobile Authenticator is enabled on your Steam account for at least 15 days. Before that we unfortunately cannot send you a trade offer, otherwise the trade will be withheld for 7 days by Steam.</p>
              <div className=' w-max flex items-center mb-6 gap-2 hover:text-white cursor-pointer duration-200'>
               <span className='tracking-[1.12px] uppercase'>set up steam guard</span>
               <ExternalLink  className='w-[18px] h-[18px] ' />
              </div>
            </div>
            )
        }
      </SettingField>
    </div>
  )
}

export default SteamSettings