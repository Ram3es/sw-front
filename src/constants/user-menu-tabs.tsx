import { ReactComponent as Wallet } from '../assets/img/profile/wallet-icon.svg'
import { ReactComponent as PlusCircle } from '../assets/img/profile/circle-plus.svg'
import { ReactComponent as MinusCircle } from '../assets/img/profile/circle-minus.svg'
import { ReactComponent as GiftIcon } from '../assets/img/profile/gift-icon.svg'
import { ReactComponent as Dollar } from '../assets/img/profile/circle-dollar.svg'
import { ReactComponent as Mark } from '../assets/img/profile/circle-mark.svg'
import { ReactComponent as List } from '../assets/img/profile/todo-list.svg'
import { ReactComponent as Daggers } from '../assets/img/profile/daggers.svg'
import { ReactComponent as Arrows } from '../assets/img/profile/arrows.svg'
import { ReactComponent as Support } from '../assets/img/profile/support.svg'
import { ReactComponent as Setting } from '../assets/img/profile/setting.svg'
import { logoutSteam } from '../services/auth/auth'

export interface IUserMenu {
  title: string
  icon?: JSX.Element
  path?: string
  handleFunction?: () => void
}

export const USER_MENU: IUserMenu[][] = [
  [
    {
      title: 'wallet',
      path: '/',
      icon: <Wallet />
    },
    {
      title: 'add funds',
      path: '/',
      icon: <PlusCircle />
    },
    {
      title: 'pay out',
      path: '/instant-sell/payout',
      icon: <MinusCircle />
    },
    {
      title: 'redeem gift card',
      path: '/',
      icon: <GiftIcon />
    }
  ],
  [
    {
      title: 'sell items',
      path: '/',
      icon: <Dollar />
    },
    {
      title: 'withdraw items',
      path: '/',
      icon: <Mark />
    },
    {
      title: 'my listed items',
      path: '/',
      icon: <List />
    },
    {
      title: 'redeem item',
      path: '/',
      icon: <Daggers />
    }
  ],
  [
    {
      title: 'transactions',
      path: '/transactions',
      icon: <Arrows />
    }
  ],
  [
    {
      title: 'support',
      handleFunction: () => {},
      icon: <Support />
    },
    {
      title: 'settings',
      path: '/',
      icon: <Setting />
    }
  ],
  [
    {
      title: 'log out',
      handleFunction: () => {
        void logoutSteam()
      }
    }
  ]
]
