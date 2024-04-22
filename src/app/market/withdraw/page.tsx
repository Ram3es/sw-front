'use client'
import Bar from '@/components/Bar/Bar'
import { IsUserLogged } from '../../../components/IsUserLogged/IsUserLogged'
import Readme from '../../../components/funds/readme/Readme'
import Link from "next/link"
import { useCallback, useEffect, useState } from 'react'
import { getTradeOffers } from '../../../services/market/market'
import { ITradeOffersResponse } from '../../../types/Market'
import TradeOfferCard from '../../../components/Content/TradeOfferCard'
import { ECardVariant } from '../../../types/Card'
import { Button } from '../../../components/Navigation'
import { IMAGE_ROOT_URL } from '@/constants/common'
import { getImageURL } from '@/helpers/getImageURL'
import { createTrade, receiveTradeOffers } from '@/services/inventory/inventory'

export default function Inventory() {
  const [tradeOffers, setTradeOffers] = useState<ITradeOffersResponse[] >([])

  const getAllTradeOffers = useCallback(async () => {
    try {
      const offerData = await receiveTradeOffers()
      setTradeOffers(offerData)
      //old
      // const data = await getTradeOffers()
      // setTradeOffers(data)
    } catch (error) {

    }
  }, [])

  const sendTrade = useCallback(async(offerId:string ) => {
    try {
      const updatedTradeOffers = await createTrade(offerId)
      setTradeOffers(updatedTradeOffers)
    } catch (error) {
     console.log(error) 
    }
  }, [])

  useEffect(() => {
    void getAllTradeOffers()
  }, [])

  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>Inventory</h1>
        </div>
      </Bar>
      <IsUserLogged>
        <div className='w-full flex flex-col pt-12 pb-44 md:pb-20 max-w-[672px] mx-auto px-7 md:px-0'>
          <Readme>
            <>
              <p>To transfer items you have to accept Trade Offer(s) sent to you by our Skinwallet Bot(s). Please remember to trade according to Security Guidelines and check every Trade Offer to avoid getting scammed. If you encounter any suspicious actions contact our Customer Support immediately.</p>
              <Link
                href={'/terms-of-service'}
                className='underline hover:no-underline'
              >
                Read more about Trade Offers and Safety Rules
              </Link>
            </>
          </Readme>
          <div className=' flex flex-col gap-4 my-10'>
            {tradeOffers.map(offer =>
               <TradeOfferCard
                 key={offer.tradeId}
                 botName={offer.botProfile.name}
                 token={offer.botProfile.avatarHash}
                 status={offer.state}
                 botLevel = {offer.botProfile.level}
                 memberSince={offer.botProfile.memberSince}
                 expiredAt={offer.updatedAt}
                 tradeOfferId={offer.tradeOfferId}
                 items={offer.trade_items.map(item => (
                   {
                     id: item.assetid,
                     name: item.name,
                     image: getImageURL(item.icon_url),
                     condition: 0.0002323023232,
                     variant: ECardVariant.offer
                   }))}
                 sendTrade={() => sendTrade(offer.tradeId)}
               />)}
          </div>

          <div className="fixed left-0 bottom-0 w-full z-40 p-6 flex flex-col lg:flex-row gap-2 lg:gap-12 font-['Barlow'] items-center bg-graySecondary text-darkSecondary">
            <div className="flex flex-col w-max">
              <span className="text-18 font-medium w-max">0/3 Trade Offers accepted</span>
            </div>
            <p className="w-full text-sm font-normal">Accept Trade Offers to transfer your items to your Steam Inventory. Each Trade Offer has limited time to make an action.</p>
            <Button
              text='finish'
              onClick={() => { console.log('finish') }}
              heightClass="h-10"
              className='justify-center cursor-pointer uppercase bg-darkSecondary text-white font-semibold border border-darkSecondary cta-clip-path '
            />
          </div>
        </div>
      </IsUserLogged>
    </>

  )
}


