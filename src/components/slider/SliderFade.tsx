'use client'
import Slider from 'react-slick'
import { FADE_SLIDER_SETTINGS } from '../../constants/slider-settings'
import ProfileSupportIcon from '../icons/profile/ProfileSupportIcon'
import MarketShieldMarkIcon from '../icons/market/MarketShieldMarkIcon'
import ProfileGiftIcon from '../icons/profile/ProfileGiftIcon'
import Link from 'next/link'
import { Suspense, lazy } from 'react'
import Loader from '../Content/Loader'
const TrustBox = lazy(() => import('../../components/Content/TrustBox'))

const SliderFade = () => {
  return (
        <Slider {...FADE_SLIDER_SETTINGS} >
            <div className='h-full p-3 md:p-0'>
              <div className='w-full h-full md:h-12 flex flex-col md:flex-row justify-center items-center gap-2 text-sm'>
                <ProfileSupportIcon className='w-4 h-4' />
                <span className='uppercase '> 24/7 support</span>
                <span className='text-graySecondary'>Friendly customer service is there for you anytime you need.</span>
              </div>
            </div>
            <div className='p-3 md:p-0'>
              <div className='w-full h-full md:h-12 flex flex-col md:flex-row justify-center items-center gap-2 text-sm'>
                <MarketShieldMarkIcon />
                <span className='uppercase'>100% secure</span>
                <span className='text-graySecondary'>All transactions are thoroughly monitored, so your money and skins are safe.</span>
              </div>
            </div>
            <div className='p-3 md:p-0'>
              <div className='w-full h-full md:h-12 flex flex-col md:flex-row justify-center items-center gap-2 text-sm'>
                <ProfileGiftIcon />
                <span className='uppercase'>+600 GIFT CARD PAYOUTS</span>
                <span className='text-graySecondary'>Vanilla Visa, Amazon, PlayStation Store, Xbox Games Store, Best Buy and</span>
                <Link
                  href='https://rewardsbygcow.io/catalog'
                  className='text-white underline hover:text-graySecondary hover:no-underline duration-200'
                >
                  more!
                </Link>
              </div>
            </div>
            <div className='p-3 md:p-0'>
              <div className=' pt-3 '>
                <Suspense fallback={<Loader />}>
                  <TrustBox />
                </Suspense>
              </div>
            </div>
        </Slider>
  )
}

export default SliderFade
