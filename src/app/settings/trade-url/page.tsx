'use client'
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function TradeUrl() {
    const { user } = useAppContext()
    return (
      <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] flex flex-col gap-8 mx-auto '>
            <div className="flex flex-col">
              <span className="text-base text-graySecondary">Trade URL is required to receive trade offers on your Steam account.</span>
              <Link
                href={`https://steamcommunity.com/profiles/${user?.id}/tradeoffers/privacy#trade_offer_access_url`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="underline text-skinwalletPink hover:text-graySecondary duration-200"
              >
                 Find your Trade URL here
              </Link>
            </div>
          </div>
      </div>
    )
}