"use client"
import { Nav } from "@/components/InstantSellControls/nav"
import { IsUserLogged } from "@/components/IsUserLogged/IsUserLogged"
import { Button } from "@/components/Navigation"
import InformationIcon from "@/components/icons/InformationIcon"
import { ChangeEvent, useState } from "react"
import ProgressBonusBar from "./ProgressBonusBar"

export default function Bonus() {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  return (
      <div className='flex flex-col flex-grow py-5'>
        <div className='flex justify-between h-[50px] xl:border-b border-solid border-darkGrey px-0 xl:px-[8px]'>
          <Nav />
        </div>
        <IsUserLogged>
          <div className='flex flex-col lg:flex-row gap-y-12 px-6 py-[30px] text-white '>
            <div className='w-full md:w-2/3 lg:w-2/5 flex flex-col gap-4 pl-0  llg:pl-16 pr-0 sm:pr-16 '>
              <h2 className='text-2xl font-medium'>BONUSES</h2>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Enter coupon code'
                  value={inputValue}
                  onChange={handleChange}
                  className='w-full h-11 pl-4 pr-24 bg-darkGrey outline-none'
                />
                <Button
                  text='Redeem'
                  onClick={() => { console.log('submit') }}
                  className='absolute top-0 right-0 h-full cta-clip-path text-base text-darkGrey bg-skinwalletPink/50 hover:bg-skinwalletPink/80 uppercase cursor-pointer '
                />
              </div>
            </div>
            <div className='w-full lg:w-3/5 flex flex-col gap-12 pl-0 lg:pl-0 '>
              <h2 className='text-2xl font-medium' >BONUS PROGRAM</h2>
              <p className='max-w-[612px] text-lg'>Best prices is something you’re always looking for? You can earn up to 5% extra on top of the regular prices by simply being a loyal customer. Additionally, all your transactions are accumulated so you can reach higher tiers more easily. Remember! Your bonus never expires - once earned it’s yours forever.</p>
              <div className=' w-fit flex items-center gap-4 px-5 py-3  text-lg text-swViolet [&_span]:text-swViolet bg-darkGrey border-l-2 border-swViolet'>
                  <InformationIcon iconClasses='w-5 h-5 shrink-0 ' />
                <p className='text-white'>To reach the next bonus tier you need to deposit items worth at least <span>$50.00</span>.</p>
              </div>
              <ProgressBonusBar />
            </div>
          </div>
        </IsUserLogged>
      </div>
  )
}