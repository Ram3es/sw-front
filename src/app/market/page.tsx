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
import { getOffers } from "@/services/market/market"
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
                    <div className='flex flex-col sm:flex-row gap-3 text-21 mt-8'>
                      <Link href="/" >
                          <Button
                            text='sell skins'
                            className='w-full sm:w-max justify-center text-23 small-caps leading-[24px] tracking-[2.3px] text-darkSecondary bg-swLightOrange cta-clip-path hover:opacity-80 [&_.text]:mb-1 '
                            heightClass='h-12'
                          />
                          </Link>
                        <div className=' w-full sm:w-max relative overflow-hidden hover button'>
                          <Link href="/market/offers" >
                            <Button
                              text='buy now'
                              className=' bg-black bg-opacity-50 w-full border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary text-23 small-caps leading-[24px] tracking-[2.3px] [&_.text]:mb-1'
                              heightClass='h-12'
                            />
                            <div className='absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45' />
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className='w-full flex flex-col items-center max-w-[1850px] pt-16 px-16'>
            <div className='w-full flex flex-col max-w-[1160px]'>
              <div className='w-full h-full flex flex-col '>
                <SkinsCategoriesTitle
                  path='/market/offers'
                  title='hot offers'
                  icon={<MarketHotIcon className='text-swRed' />}
                  totalSkins={offerCards?.total ?? 0}
                />
                <SliderCard settings={HOT_SLIDER_SETTINGS} items={offerCards?.hot || []} />
              </div>
              <div className='w-full h-full flex flex-col mt-8 '>
                <SkinsCategoriesTitle
                  path='/market/offers'
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