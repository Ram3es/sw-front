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
      title: 'add funds',
      path: '/wallet',
      icon: <PlusCircle />
    },
    {
      title: 'pay out',
      path: 'panel/deposit/payout',
      icon: <MinusCircle />
    },
    {
      title: 'redeem gift card',
      path: '/wallet',
      icon: <GiftIcon />
    }
  ],
  [
    {
      title: 'sell items',
      path: '/inventory',
      icon: <Dollar />
    },
    {
      title: 'withdraw items',
      path: '/inventory',
      icon: <Mark />
    },
    {
      title: 'my listed items',
      path: '/inventory',
      icon: <List />
    },
    {
      title: 'redeem item',
      path: '/redeem-item',
      icon: <Daggers />
    }
  ],
  [
    {
      title: 'transactions',
      path: '/panel/transactions',
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
      path: '/settings',
      icon: <Setting />
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
