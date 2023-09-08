'use client'
import Bar from "@/components/Bar/Bar"
import { Button } from "@/components/Navigation"
import { useCartContext } from "@/context/CartContext"
import { classNames } from "@/helpers/className"
import { formatToDecimal } from "@/helpers/numberFormater"
import Link from "next/link"

export default function Inventory() {
  const { cartItems } = useCartContext()
  return (
    <>
    <Bar>
      <div className="flex justify-between items-center h-full px-6">
        <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
          Cart
        </h1>
      </div>
    </Bar>
    <div className='w-full flex flex-grow justify-center pt-6 sm:py-12 '>
      <div className='w-full h-[calc(100vh_-_234px)] sm:h-full max-w-[1024px] flex flex-col justify-between sm:flex-row sm:gap-8 '>
        <div className='w-full  h-full max-w-[672px] flex flex-col gap-4 pb-10 px-6 sm:px-0 text-white overflow-y-scroll relative '>
          {cartItems.items.length === 0 ? (
            <div className="flex flex-col gap-6">
              <h3 className='text-white font-Barlow text-[21px] font-medium uppercase'>
                cart is empty
              </h3>
              <p className="font-Barlow text-graySecondary text-base font-normal">Rush market and add something!</p>
              <Link
                href="/market"
              >
                <Button
                  text='browse skins'
                  onClick={() => {}}
                  className={classNames('bg-skinwalletPink justify-center items-center w-max h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200 cta-clip-path')}
                />
              </Link>
            </div>
          ) : (
            <div>
              items
            </div>
          )}
        </div>
        <div className=' h-max w-full sm:w-[320px] text-graySecondary bg-darkGrey p-6 sm:cta-clip-path relative'>
            <div className='w-full '>
              <div className='flex flex-col gap-2'>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>amount</div>
                  <span className='text-white'>${formatToDecimal('1000')}</span>
                </div>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>payment fee</div>
                  <span className=''>${formatToDecimal('1000')}</span>
                </div>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>total payment</div>
                  <span className=' text-2xl leading-6  text-white '>${formatToDecimal('1000')}</span>
                </div>
              </div>
            </div>
            <Button
              text='checkout'
              onClick={() => {}}
              className={classNames('bg-skinwalletPink justify-center items-center w-full h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                cartItems.items.length !== 0 ? '' : 'pointer-events-none opacity-50')}
             />
             <div className='w-full absolute left-0 -top-10 h-10 sm:hidden' style={{ background: 'linear-gradient(180deg, rgba(20, 20, 21, 0.00) 0%, #0D0D0D 100%)' }}/>
          </div>
      </div>
    </div>
    </>
  )
}
