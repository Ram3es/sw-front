import ProfileArrowsIcon from '@/components/icons/profile/ProfileArrowsIcon'
import { logoutSteam } from '../services/auth/auth'
import ProfileCircleDollarIcon from '@/components/icons/profile/ProfileCircleDollarIcon'
import ProfileCircleMark from '@/components/icons/profile/ProfileCircleMark'
import ProfileCircleMinus from '@/components/icons/profile/ProfileCircleMinus'
import ProfileCirclePlus from '@/components/icons/profile/ProfileCirclePlus'
import ProfileDaggers from '@/components/icons/profile/ProfileDaggers'
import ProfileGiftIcon from '@/components/icons/profile/ProfileGiftIcon'
import ProfileSettingIcon from '@/components/icons/profile/ProfileSettingIcon'
import ProfileSupportIcon from '@/components/icons/profile/ProfileSupportIcon'
import ProfileTodoList from '@/components/icons/profile/ProfileTodoList'

export interface IUserMenu {
  title: string
  icon?: JSX.Element
  path?: string
  handleFunction?: () => void
}

export const USER_MENU: IUserMenu[][] = [
  [
    {
      title: 'add funds',
      path: '/wallet',
      icon: <ProfileCirclePlus />
    },
    {
      title: 'pay out',
      path: 'panel/deposit/payout',
      icon: <ProfileCircleMinus />
    },
    {
      title: 'redeem gift card',
      path: '/wallet',
      icon: <ProfileGiftIcon />
    }
  ],
  [
    {
      title: 'sell items',
      path: '/inventory',
      icon: <ProfileCircleDollarIcon />
    },
    {
      title: 'withdraw items',
      path: '/market/inventory',
      icon: <ProfileCircleMark />
    },
    {
      title: 'my listed items',
      path: '/market/withdraw',
      icon: <ProfileTodoList />
    },
    {
      title: 'redeem item',
      path: '/redeem-item',
      icon: <ProfileDaggers />
    }
  ],
  [
    {
      title: 'transactions',
      path: '/panel/transactions',
      icon: <ProfileArrowsIcon />
    }
  ],
  [
    {
      title: 'support',
      handleFunction: () => {},
      icon: <ProfileSupportIcon />
    },
    {
      title: 'settings',
      path: '/settings',
      icon: <ProfileSettingIcon />
    }
  ],
  [
    {
      title: 'log out',
      handleFunction: () => {
        void logoutSteam()
        location.reload()
      }
    }
  ]
]
