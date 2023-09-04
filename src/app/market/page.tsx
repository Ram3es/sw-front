import EmptyCard from "@/components/Content/EmptyCard"
import ItemCard from "@/components/Content/ItemCard"
import { Button } from "@/components/Navigation"
import Footer from "@/components/footer/Footer"
import PlusIcon from "@/components/icons/PlusIcon"
import MarketArrowRightIcon from "@/components/icons/market/MarketArrowRightIcon"
import MarketHotIcon from "@/components/icons/market/MarketHotIcon"
import SliderCard from "@/components/slider/SliderCard"
import SliderFade from "@/components/slider/SliderFade"
import { HOT_SLIDER_SETTINGS, NEWLY_SLIDER_SETTINGS } from "@/constants/slider-settings"
import { IMAGE_ROOT_URL } from "@/constants/strings"
import { buyItems, getOffers } from "@/services/market/market"
import { ECardVariant, IOffersCard } from "@/types/Card"
import Link from "next/link"
import LandingInfo from "./LandingInfo"

const SkinsCategoriesTitle = ({ title, icon, path, totalSkins }: { title: string, icon?: JSX.Element, path: string, totalSkins: number }) => {
  return (
    <div className=' w-full flex flex-col md:flex-row items-center justify-between text-graySecondary'>
      <div className='flex items-center gap-2 text-swRed'>
          <h2 className='text-24 uppercase tracking-[1.2px] text-white '>{title}</h2>
          {icon}
      </div>
      <Link
        href={path}
        className='uppercase flex items-center gap-2 hover:text-white duration-200'
      >
          <span className='tracking-[1.12px]'>{`see all ${(totalSkins).toLocaleString('en-US')} skins`}</span>
          <MarketArrowRightIcon />
      </Link>
     </div>
  )
}

interface IOffersCardsState {
  total: number
  hot: IOffersCard[]
  newest: IOffersCard[]
}

async function getData(sortBy: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/market/offers?appid=730&sortBy=${sortBy}`, {
    cache: 'force-cache',
    credentials: 'include'
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res.statusText);
    
  }
 
  return res.json()
}

export default async function Market() {
  const { total, offers: hot } = await getOffers('HotDeals')
  const { offers: newest } = await getOffers('Newest')
  
  const offerCards = { total, hot, newest }
  return (
    <div className='flex flex-col items-center w-full'>
          <div className='w-full h-auto md:h-12 flex justify-center items-center bg-darkGrey text-white'>
            <div className='w-full h-full'>
              <SliderFade />
            </div>
          </div>
          <div
            className='w-full flex justify-center bg-black relative text-white overflow-hidden'
          >
            <div
              className='h-[600px] w-[1850px] mx-auto bg-center lg:bg-cover flex items-center'
              style={{
                backgroundImage: `url(/img/market/rebranded-hero-artwork.jpg)`,
                backgroundRepeat: 'no-repeat'
              }}
            >
                <div className=' w-full px-6 md:px-28 py-4 md:py-16 flex flex-col justify-center'>
                    <h3 className='text-21 uppercase tracking-[1.68px]'>paint the battlefield</h3>
                    <div className='flex flex-col leading-[40px] text-[36px] md:leading-[70px] md:text-[64px] uppercase '>
                        <span>buy new skins</span>
                        <span>or sell your</span>
                        <span>own for cash</span>
                    </div>
                    <div className='flex gap-3 h-12 text-21  mt-8'>
                        <Link
                          href='/'
                        >
                          <Button
                            text='sell skins'
                            className=' h-full text-darkSecondary uppercase bg-swLightOrange cta-clip-path hover:opacity-80 '
                          />
                        </Link>
                        <div className=' w-max relative overflow-hidden hover button'>
                          <Link
                            href='/'
                          >
                            <Button
                              text='buy now'
                              className=' w-full h-full border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary'
                            />
                          </Link>
                          <div className='absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45' />
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className='w-full flex flex-col items-center max-w-[1850px] px-16'>
            <Link
              href='/'
            >
              <div
                  className='my-12 pt-8 cursor-pointer  '
              >
                  <img src="/img/market/sell-instantly-banner.png" alt='SellBaner' className='w-full' />
              </div>
            </Link>
            <div className='w-full flex flex-col max-w-[1160px]'>
              <div className='w-full h-full flex flex-col '>
                <SkinsCategoriesTitle
                  path='/'
                  title='hot offers'
                  icon={<MarketHotIcon className='text-swRed' />}
                  totalSkins={offerCards?.total ?? 0}
                />
                <SliderCard settings={HOT_SLIDER_SETTINGS} items={offerCards?.hot || []} />
              </div>
              <div className='w-full h-full flex flex-col mt-8 '>
                <SkinsCategoriesTitle
                  path='/'
                  title='newly listed'
                  icon={<PlusIcon />}
                  totalSkins={offerCards?.total ?? 0}
                />
                <SliderCard settings={NEWLY_SLIDER_SETTINGS} items={offerCards?.newest || []} />
              </div>
              <LandingInfo />
            </div>
          </div>
          <Footer />
        </div>
  )
}