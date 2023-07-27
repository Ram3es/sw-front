
import { Link, useNavigate } from 'react-router-dom'
import BanerMain from '../../assets/img/market/rebranded-hero-artwork.jpg'
import SellBaner from '../../assets/img/market/sell-instantly-banner.png'
import { ReactComponent as HotIcon } from '../../assets/img/market/hot.svg'
import { ReactComponent as ArrowRight } from '../../assets/img/market/arrow-right.svg'
import { Button } from '../../components/Navigation'
import { USER_INVENTORY } from '../../mock/inventory'
import ItemCard from '../../components/Content/ItemCard'
import LandingInfo from './LandingInfo'
import Footer from '../../components/footer/Footer'
import SliderCard from '../../components/slider/SliderCard'
import PlusIcon from '../../components/icons/PlusIcon'
import { SETTINGS as hotSliderSettings, newlySliderSettings } from '../../constants/slider-settings'
import { ECardVariant } from '../../types/Card'
import SliderFade from '../../components/slider/SliderFade'
import EmptyCard from '../../components/Content/EmptyCard'

const SkinsCategoriesTitle = ({ title, icon, path, totalSkins }: { title: string, icon?: JSX.Element, path: string, totalSkins: number }) => {
  return (
    <div className=' w-full flex items-center justify-between text-graySecondary'>
      <div className='flex items-center gap-2 text-swRed'>
          <h2 className='text-24 uppercase tracking-[1.2px] text-white '>{title}</h2>
          {icon}
      </div>
      <Link
        to={path}
        className='uppercase flex items-center gap-2 hover:text-white duration-200'
      >
          <span className='tracking-[1.12px]'>{`see all ${(totalSkins).toLocaleString('en-US')} skins`}</span>
          <ArrowRight />
      </Link>
     </div>
  )
}

const MarketLanding = () => {
  const navigate = useNavigate()
  return (
        <div className='flex flex-col items-center w-full'>
          <div className='w-full h-12 flex justify-center items-center bg-darkGrey text-white'>
            <div className='w-[800px] h-full '>
              <SliderFade />
            </div>
          </div>
          <div
            className='w-full flex justify-center bg-black relative text-white'
          >
            <div
              className='h-[600px] w-[1850px] mx-auto '
              style={{
                backgroundImage: `url(${BanerMain})`,
                backgroundRepeat: 'no-repeat'
              }}
            >
                <div className=' w-full px-28 py-16 flex flex-col justify-center'>
                    <h3 className='text-21 uppercase tracking-[1.68px]'>paint the battlefield</h3>
                    <div className='flex flex-col leading-[70px] text-[64px] uppercase '>
                        <span>buy new skins</span>
                        <span>or sell your</span>
                        <span>own for cash</span>
                    </div>
                    <div className='flex gap-3 h-12 text-21  mt-8'>
                        <Button
                          text='sell skins'
                          onClick={() => { navigate('/') }}
                          className=' h-full text-darkSecondary uppercase bg-swLightOrange cta-clip-path hover:opacity-80 '
                        />
                        <div className=' w-max relative overflow-hidden hover button'>
                          <Button
                            text='buy now'
                            onClick={() => { navigate('/') }}
                            className=' w-full h-full border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary'
                          />
                          <div className='absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45' />
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className='w-full flex flex-col items-center max-w-[1850px] px-16'>
            <div
                onClick={() => { navigate('/') }}
                className='my-12 pt-8 cursor-pointer  '
            >
                <img src={SellBaner} alt='SellBaner' className='w-full' />
            </div>
            <div className='w-full flex flex-col max-w-[1160px]'>
              <div className='w-full h-full flex flex-col '>
                <SkinsCategoriesTitle
                  path='/'
                  title='hot offers'
                  icon={<HotIcon className='text-swRed' />}
                  totalSkins={34775}
                />
                <SliderCard settings={hotSliderSettings} >
                  {USER_INVENTORY.map((card) =>
                    <ItemCard
                      key={card.id}
                      variant={ECardVariant.market}
                      onClick={() => { console.log('click') }}
                      submitFn={() => {}}
                      {...card} />)}
                      <EmptyCard />
                </SliderCard>
              </div>
              <div className='w-full h-full flex flex-col mt-8 '>
                <SkinsCategoriesTitle
                  path='/'
                  title='newly listed'
                  icon={<PlusIcon />}
                  totalSkins={51344}
                />
                <SliderCard settings={newlySliderSettings} >
                  {USER_INVENTORY.map((card) =>
                    <ItemCard
                      key={card.id}
                      variant={ECardVariant.market}
                      onClick={() => { console.log('click') }}
                      submitFn={() => {}}
                      {...card}
                      />)}
                      <EmptyCard />
                </SliderCard>
              </div>
              <LandingInfo />
            </div>
          </div>
          <Footer />
        </div>
  )
}

export default MarketLanding
