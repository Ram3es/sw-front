import DiscordIcon from '@/components/icons/socials/Discord'
import FacebookIcon from '@/components/icons/socials/Facebook'
import TwitterIcon from '@/components/icons/socials/Twitter'
import InstagramIcon from '@/components/icons/socials/Instagram'
import YoutubeIcon from '@/components/icons/socials/Youtube'
import SteamIcon from '@/components/icons/socials/Steam'
import VkIcon from '@/components/icons/socials/Vk'

import AirtmIcon from '@/components/icons/payments/Airtm'
import MastercardIcon from '@/components/icons/payments/Mastercard'
import PayeerIcon from '@/components/icons/payments/Payeer'
import PayoneerIcon from '@/components/icons/payments/Payoneer'
import QiwiIcon from '@/components/icons/payments/Qiwi'
import TipaltiIcon from '@/components/icons/payments/Tipalti'
import VisaIcon from '@/components/icons/payments/Visa'


export const SIDEBAR_LINKS = [
  {
    title: 'investors',
    path: '/'
  },
  {
    title: 'instant sell',
    path: '/'
  },
  {
    title: 'affiliate program ',
    path: '/'
  },
  {
    title: 'BLOG',
    path: '/'
  },
  {
    title: 'privacy',
    path: '/'
  },
  {
    title: 'Terms of Service',
    path: '/'
  },
  {
    title: 'support',
    path: '/'
  },
  {
    title: 'sitemap',
    path: '/'
  },
  {
    title: 'FAQ',
    path: '/'
  },
  {
    title: 'API',
    path: '/'
  }
]

export const SOCIAL_LINKS = [
  {
    title: 'discord',
    path: 'https://discord.gg/skinwallet',
    icon: <DiscordIcon />
  },
  {
    title: 'twitter',
    path: 'https://twitter.com/Skinwalletcom',
    icon: <TwitterIcon />
  },
  {
    title: 'steam',
    path: 'https://steamcommunity.com/groups/SkinwalletOfficial',
    icon: <SteamIcon />
  }
]

export const PAYMENT_METHODS = [
  {
    title: 'visa',
    icon: <VisaIcon />
  },
  {
    title: 'mastercard',
    icon: <MastercardIcon />
  },
  {
    title: 'airtm',
    icon: <AirtmIcon />
  },
  {
    title: 'payeer',
    icon: <PayeerIcon />
  },
  {
    title: 'payoneer',
    icon: <PayoneerIcon />
  },
  {
    title: 'qiwi',
    icon: <QiwiIcon />
  },
  {
    title: 'tipalti',
    icon: <TipaltiIcon />
  }
]
