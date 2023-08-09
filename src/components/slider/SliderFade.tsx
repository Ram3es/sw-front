import Slider from 'react-slick'
import { FADE_SLIDER_SETTINGS } from '../../constants/slider-settings'
import { ReactComponent as Support } from '../../assets/img/profile/support.svg'
import { ReactComponent as Shield } from '../../assets/img/market/shield-mark.svg'
import { ReactComponent as Gift } from '../../assets/img/profile/gift-icon.svg'
import { Link } from 'react-router-dom'
import TrustBox from '../Content/TrustBox'

const SliderFade = () => {
  return (
        <Slider {...FADE_SLIDER_SETTINGS} >
            <div className='h-full p-3 md:p-0'>
              <div className='w-full h-full md:h-12 flex flex-col md:flex-row justify-center items-center gap-2 text-sm'>
                <Support className='w-4 h-4' />
                <span className='uppercase '> 24/7 support</span>
                <span className='text-graySecondary'>Friendly customer service is there for you anytime you need.</span>
              </div>
            </div>
            <div className='p-3 md:p-0'>
              <div className='w-full h-full md:h-12 flex flex-col md:flex-row justify-center items-center gap-2 text-sm'>
                <Shield />
                <span className='uppercase'>100% secure</span>
                <span className='text-graySecondary'>All transactions are thoroughly monitored, so your money and skins are safe.</span>
              </div>
            </div>
            <div className='p-3 md:p-0'>
              <div className='w-full h-full md:h-12 flex flex-col md:flex-row justify-center items-center gap-2 text-sm'>
                <Gift />
                <span className='uppercase'>+600 GIFT CARD PAYOUTS</span>
                <span className='text-graySecondary'>Vanilla Visa, Amazon, PlayStation Store, Xbox Games Store, Best Buy and</span>
                <Link
                  to='https://rewardsbygcow.io/catalog'
                  className='text-white underline hover:text-graySecondary hover:no-underline duration-200'
                >
                  more!
                </Link>
              </div>
            </div>
            <div className='p-3 md:p-0'>
              <div className=' pt-3 '>
                <TrustBox />
              </div>
            </div>
        </Slider>
  )
}

export default SliderFade
