import ClockIconNoFilled from "@/components/icons/ClockIconNoFilled"
import SteamIcon from "@/components/icons/SteamIcon"
import { AddOfferToCart } from "@/components/icons/market/AddOfferToCart"
import HystoryOfferSales from "@/components/icons/market/HystoryOfferSales"
import ExternalLink from "@/components/icons/settings/ExternalLink"
import ShieldCheck from "@/components/icons/settings/ShieldCheck"
import SliderCard from "@/components/slider/SliderCard"
import { CONDITIONS } from "@/constants/item-conditions"
import { NEWLY_SLIDER_SETTINGS } from "@/constants/slider-settings"
import { findNearestMaxValue } from "@/helpers/findNearestMaxValue"
import { getImageURL } from "@/helpers/getImageURL"
import { format, percentageDecrease } from "@/helpers/numberFormater"
import { getOfferById, getOfferSalesHistory, getSimilarOffers } from "@/services/market/market"
import { ESteamAppId } from "@/types/Inventory"
import { Metadata } from "next"
import Link from "next/link"

interface IOfferProps {
    params: {
        id: string
    }
}
export async function generateMetadata(
  { params: { id } }: IOfferProps,
): Promise<Metadata> {

  const item = await getOfferById(id)

  return {
    title:`Skinwallet Market | Offer-${item.name}`,
   
  }
}
export default async function Offer({ params: { id } }: IOfferProps){
const offerData =  await getOfferById(id)
const { offershHistory: history } = await getOfferSalesHistory(id)
const { similarOffers } = await getSimilarOffers()

const {
     name,
     appId,
     price,
     pattern,
     imageUrl,
     typeName,
     wearFloat,
     steamPrice 
    } = offerData

const conditionObj = findNearestMaxValue(CONDITIONS, wearFloat)
   
  return(

    <div>
      <div className="w-full h-[625px] bg-darkGrey backdrop-offer-hexagon">
        <div className="h-full">
            <div className="text-graySecondary text-xs h-10 px-6 flex items-center uppercase gap-3">
              <span>{Object.keys(ESteamAppId)[Object.values(ESteamAppId).indexOf(appId.toString() as  ESteamAppId)]}</span>
              /
              <span>{typeName}</span>
              /
              <span>{name.split('|')[0]}</span>
            </div>
          <div className="h-[calc(100%_-_60px)] flex justify-end">
            <div className="w-full max-w-[580px] ml-auto relative py-6">
              <span
                className={'absolute left-1/2 -translate-x-1/2  h-0 w-36 top-36'}
                style={{
                  boxShadow: 'rgba(255, 255, 255, 0.7) 0px 0px 95px 23px'
                }}
              />
              <img src={getImageURL(imageUrl)} alt="item" className="w-[360px] h-auto relative mx-auto" />
            </div>
            <div className="w-full max-w-[50%] flex flex-col gap-8 py-4 px-8">
              <div>
                <span className="text-lg uppercase block text-graySecondary tracking-[0.9px] mb-2">classified {typeName}</span>
                <h1 className="text-white text-[40px] leading-10 ">{name}</h1>
              </div>
              <div className="flex flex-col gap-2 max-w-[272px]">
                <div className="flex gap-1 items-center">
                  <span className="text-4xl text-white font-semibold tracking-[1.6px]">${format(price.amount)}</span>
                  {steamPrice.amount ? <div className='bg-[#18E86B] h-6 px-1'>{percentageDecrease(steamPrice.amount, price.amount)}%</div> : ''}
                </div>
                <div className="flex gap-2 items-center text-graySecondary">
                  <SteamIcon className='w-[18px] h-[21px]'/>
                  <span className="uppercase text-lg leading-[18px] tracking-[0.9px]">steam price: ${format(steamPrice.amount ?? 0)}</span>
                </div>
                <div className="flex items-center mt-2 gap-2 text-swLime">
                  <ClockIconNoFilled className="" />
                  <span className="uppercase text-sm tracking-[1.12px]">tradable</span>  
                </div>
                <div className="w-full border-t border-white/10 mt-8 ">
                  <div className="w-1/6 border-b border-white/10 "/>
                </div>
                <div className="text-lg font-normal">
                  {pattern && <span className="text-graySecondary ">Pattern - {pattern}</span>}
                  {wearFloat
                    ? (
                    <div className="flex flex-col gap-[14px] w-full">
                      <div style={{ color: conditionObj?.color ?? ''}}>
                        {conditionObj?.text} - {wearFloat.toFixed(5)}
                      </div>
                      <div className="relative w-full flex h-1">
                        <div className="w-[7%] h-full bg-[#18E86B]"/>
                        <div className="w-[8%] h-full bg-[#3DB26E]"/>
                        <div className="w-[22%] h-full bg-[#FACB53]"/>
                        <div className="w-[7%] h-full bg-[#97602D]"/>
                        <div className="w-auto grow h-full bg-[#424242]"/>
                        <span
                          className="absolute -top-1 w-[2px] h-3 bg-white"
                          style={{left: `${wearFloat * 100}%`}}
                        />
                      </div>
                    </div>)
                    : ''
                  }
                </div>
                {/* <AddOfferToCart offer={offerData} /> */}
              </div>
            </div>
          </div>
          </div>
      </div>
      <div className='w-full px-6 pb-12'>
        <div className="w-full flex justify-between py-8 max-w-[1168px] mx-auto text-white text-lg">
          <div className="flex gap-6 text-graySecondary ">
            <Link 
              href=''
              className="text-sm tracking-[1.12px] uppercase flex items-center gap-1 hover:text-white duration-200 "
            >
              <span>inspect in game</span>
              <ExternalLink className="w-[14px] h-auto" />
            </Link>
            <Link 
              href=''
              className="text-sm tracking-[1.12px] uppercase flex items-center gap-1 hover:text-white duration-200 "
            >
              <span>view at steam</span>
              <ExternalLink className="w-[14px] h-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-2 text-graySecondary text-sm font-normal">
            <ShieldCheck />
            <span>Listing by Skinwallet</span>
          </div>
        </div>
      </div>
      <HystoryOfferSales history={history} />
      <div className='w-full px-6 mb-12'>
        <div className="max-w-[1160px] mx-auto ">
          <h2 className="text-white uppercase text-2xl tracking-[1.2px] mb-8">similar offers</h2>
          <div className="px-6">
            {/* <SliderCard  
              items={similarOffers}
              settings={NEWLY_SLIDER_SETTINGS} 
              withEmptySlide={false}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )  
}