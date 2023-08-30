import { logoutSteam } from '../services/auth/auth'
import Image from 'next/image'

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
      icon: <Image
        src="/img/profile/circle-plus.svg"
        alt="circle-plus"
      />
    },
    {
      title: 'pay out',
      path: 'panel/deposit/payout',
      icon: <Image
        src="/img/profile/circle-minus.svg"
        alt="circle-minus"
      />
    },
    {
      title: 'redeem gift card',
      path: '/wallet',
      icon: <Image
        src="/img/profile/gift-icon.svg"
        alt="gift-icon"
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
      />
    },
    {
      title: 'withdraw items',
      path: '/market/inventory',
      icon: <Image
        src="/img/profile/circle-mark.svg"
        alt="circle-mark"
      />
    },
    {
      title: 'my listed items',
      path: '/market/withdraw',
      icon: <Image
        src="/img/profile/todo-list.svg"
        alt="todo-list"
      />
    },
    {
      title: 'redeem item',
      path: '/redeem-item',
      icon: <Image
        src="/img/profile/daggers.svg"
        alt="daggers"
      />
    }
  ],
  [
    {
      title: 'transactions',
      path: '/panel/transactions',
      icon: <Image
        src="/img/profile/arrows.svg"
        alt="arrows"
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
      />
    },
    {
      title: 'settings',
      path: '/settings',
      icon: <Image
        src="/img/profile/setting.svg"
        alt="setting"
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
