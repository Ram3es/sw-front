import CirclePlus from '@/components/icons/profile/CirclePlus'
import { logoutSteam } from '../services/auth/auth'
import Image from 'next/image'
import CircleMinus from '@/components/icons/profile/CircleMinus'

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
      icon: <CirclePlus />
    },
    {
      title: 'pay out',
      path: 'panel/deposit/payout',
      icon: <CircleMinus />
    },
    {
      title: 'redeem gift card',
      path: '/wallet',
      icon: <Image
        src="/img/profile/gift-icon.svg"
        alt="gift-icon"
        width={20}
        height={20}
      />
    }
  ],
  [
    {
      title: 'sell items',
      path: '/inventory',
      icon: <Image
        src="/img/profile/circle-dollar.svg"
        alt="circle-dollar"
        width={20}
        height={20}
      />
    },
    {
      title: 'withdraw items',
      path: '/market/inventory',
      icon: <Image
        src="/img/profile/circle-mark.svg"
        alt="circle-mark"
        width={20}
        height={20}
      />
    },
    {
      title: 'my listed items',
      path: '/market/withdraw',
      icon: <Image
        src="/img/profile/todo-list.svg"
        alt="todo-list"
        width={20}
        height={20}
      />
    },
  ],
  [
    {
      title: 'transactions',
      path: '/panel/transactions',
      icon: <Image
        src="/img/profile/arrows.svg"
        alt="arrows"
        width={20}
        height={20}
      />
    }
  ],
  [
    {
      title: 'support',
      handleFunction: () => {},
      icon: <Image
        src="/img/profile/support.svg"
        alt="support"
        width={20}
        height={20}
      />
    },
    {
      title: 'settings',
      path: '/settings',
      icon: <Image
        src="/img/profile/setting.svg"
        alt="setting"
        width={20}
        height={20}
      />
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
