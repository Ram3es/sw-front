'use client'
import Bar from "@/components/Bar/Bar"
import { Button } from "@/components/Navigation"
import { classNames } from "@/helpers/className"
import { formatToDecimal } from "@/helpers/numberFormater"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ESteamAppId } from "../../types/Inventory"
import { IOffersCard } from "../../types/Card"
import { useCartContext } from "../../context/CartContext"
import { format } from "../../helpers/numberFormater"
import ItemSelectedCard from "../../components/Content/ItemSelectedCard"
import { IMAGE_ROOT_URL } from "../../constants/strings"
import SteamIcon from "@/components/icons/checkout/SteamIcon"

export default function Inventory() {
  const { cartItems, removeFromCart, getSteamTotalPrice, getDiscount, getTotal } = useCartContext()
  const [ cartObject, setCartObject ] = useState<Record<string, IOffersCard[]> | undefined>()

  function getKeyByValue(enumObj: any, value: any) {
    for (const key in enumObj) {
      if (enumObj.hasOwnProperty(key) && enumObj[key] === value) {
        return key;
      }
    }
    return null; // Value not found in the enum
  }

  useEffect(() => {
    setCartObject(() => cartItems.items.reduce((prev: any, cur: IOffersCard) => {
      if (prev[cur.appid]) {
        prev[cur.appid] = [...prev[cur.appid], cur]
      } else {
        prev[cur.appid] = [cur]
      }
      return prev
    }, {}))
  }, [cartItems])

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
            <div className="flex flex-col font-Barlow">
              {cartObject ? Object.keys(cartObject).map((k: any) => (
                <div
                  key={k}
                  className="flex flex-col w-full gap-2"
                >
                  <div className="flex w-full justify-between border-b border-white/10 pb-6">
                    <span className="text-white text-[14px] font-medium">
                      {getKeyByValue(ESteamAppId, k)}
                    </span>
                    <span className="text-graySecondary text-[14px] font-medium">
                      {cartObject[k].length} items
                    </span>
                  </div>
                  {cartObject[k].map(card => (
                    <div className="flex w-full justify-between border-b border-white/10">
                      <ItemSelectedCard
                        key={card.name}
                        id={card.inventoryItemId}
                        variant='offer'
                        image={IMAGE_ROOT_URL.concat(card.imageUrl)}
                        price={0}
                        condition={card.wearFloat}
                        name={card.name}
                        onClick={() => {}}
                        isBorderBottom={false}
                      />
                      <div className="flex flex-col justify-between pb-6">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-Barlow text-[21px] font-medium uppercase">
                              ${format(card.price.amount)}
                            </span>
                            <span className="px-0.5 bg-swLime text-xs text-darkSecondary">
                              -{((card.steamPrice.amount - card.price.amount) / card.steamPrice.amount * 100).toFixed()} %
                            </span>
                          </div>
                          <span className="text-graySecondary flex gap-2 items-center font-Barlow text-[14px] font-medium uppercase">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5625 7.75C13.5625 6.54688 13.2344 5.39844 12.6328 4.35938C12.0312 3.32031 11.2109 2.5 10.1719 1.89844C9.13281 1.29688 7.98438 0.96875 6.78125 0.96875C5.57812 0.96875 4.48438 1.26953 3.5 1.81641C2.51562 2.36328 1.69531 3.12891 1.06641 4.05859C0.4375 5.01562 0.0820312 6.05469 0 7.20312L3.63672 8.70703C3.99219 8.48828 4.40234 8.37891 4.83984 8.37891L6.45312 6.02734V6C6.45312 5.28906 6.69922 4.6875 7.19141 4.19531C7.68359 3.70312 8.28516 3.45703 8.99609 3.45703C9.70703 3.45703 10.3086 3.70312 10.8008 4.19531C11.293 4.6875 11.5664 5.28906 11.5664 6C11.5664 6.71094 11.293 7.33984 10.8008 7.83203C10.2812 8.35156 9.65234 8.59766 8.94141 8.57031L6.64453 10.2109C6.64453 10.7578 6.48047 11.25 6.09766 11.6328C5.71484 12.0156 5.25 12.207 4.73047 12.207C4.23828 12.207 3.82812 12.0703 3.5 11.7695C3.14453 11.4961 2.92578 11.1133 2.84375 10.6758L0.246094 9.60938C0.492188 10.5391 0.929688 11.3867 1.58594 12.1523C2.21484 12.918 2.98047 13.4922 3.88281 13.9023C4.78516 14.3398 5.74219 14.5312 6.78125 14.5312C7.98438 14.5312 9.13281 14.2305 10.1719 13.6289C11.2109 13.0273 12.0312 12.1797 12.6328 11.1406C13.2344 10.1016 13.5625 8.98047 13.5625 7.75ZM4.26562 11.25C4.53906 11.3594 4.78516 11.3594 5.05859 11.25C5.33203 11.1406 5.52344 10.9492 5.63281 10.6758C5.74219 10.4023 5.74219 10.1562 5.63281 9.88281C5.52344 9.60938 5.33203 9.41797 5.08594 9.30859L4.21094 8.95312C4.56641 8.81641 4.92188 8.81641 5.27734 8.98047C5.63281 9.14453 5.87891 9.39062 6.04297 9.74609C6.20703 10.1289 6.20703 10.4844 6.04297 10.8398C5.87891 11.2227 5.63281 11.4688 5.27734 11.6328C4.89453 11.7969 4.53906 11.7969 4.18359 11.6328C3.82812 11.4961 3.58203 11.25 3.41797 10.9219L4.26562 11.25ZM9.02344 7.69531C9.46094 7.69531 9.87109 7.53125 10.1992 7.20312C10.5273 6.875 10.7188 6.49219 10.7188 6C10.7188 5.53516 10.5273 5.125 10.1992 4.79688C9.87109 4.46875 9.46094 4.30469 8.99609 4.30469C8.53125 4.30469 8.12109 4.46875 7.79297 4.79688C7.46484 5.125 7.30078 5.53516 7.30078 6C7.30078 6.49219 7.46484 6.875 7.79297 7.20312C8.12109 7.53125 8.53125 7.69531 9.02344 7.69531ZM9.02344 7.28516C8.64062 7.28516 8.33984 7.17578 8.09375 6.90234C7.84766 6.65625 7.73828 6.35547 7.73828 6C7.73828 5.67188 7.84766 5.37109 8.09375 5.09766C8.33984 4.85156 8.64062 4.71484 8.99609 4.71484C9.35156 4.71484 9.65234 4.85156 9.92578 5.09766C10.1719 5.37109 10.3086 5.67188 10.3086 6C10.3086 6.35547 10.1719 6.65625 9.92578 6.90234C9.65234 7.17578 9.35156 7.28516 9.02344 7.28516Z" fill="#A4A4A4"></path></svg>
                            ${format(card.steamPrice.amount)}
                          </span>
                        </div>
                        <div
                          className="text-graySecondary text-[14px] justify-end cursor-pointer font-medium uppercase flex items-center gap-2"
                          onClick={() => removeFromCart(card.inventoryItemId)}
                        >
                          <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.84375 12.5625H9.28125C9.39062 12.5625 9.5 12.4805 9.5 12.3438V4.90625C9.5 4.79688 9.39062 4.6875 9.28125 4.6875H8.84375C8.70703 4.6875 8.625 4.79688 8.625 4.90625V12.3438C8.625 12.4805 8.70703 12.5625 8.84375 12.5625ZM4.46875 12.5625H4.90625C5.01562 12.5625 5.125 12.4805 5.125 12.3438V4.90625C5.125 4.79688 5.01562 4.6875 4.90625 4.6875H4.46875C4.33203 4.6875 4.25 4.79688 4.25 4.90625V12.3438C4.25 12.4805 4.33203 12.5625 4.46875 12.5625ZM12.7812 2.5H9.9375L9.00781 1.29688C8.78906 0.996094 8.32422 0.75 7.96875 0.75H5.78125C5.39844 0.75 4.93359 0.996094 4.71484 1.29688L3.8125 2.5H0.96875C0.832031 2.5 0.75 2.60938 0.75 2.71875V3.15625C0.75 3.29297 0.832031 3.375 0.96875 3.375H1.625V13.4375C1.625 14.1758 2.19922 14.75 2.9375 14.75H10.8125C11.5234 14.75 12.125 14.1758 12.125 13.4375V3.375H12.7812C12.8906 3.375 13 3.29297 13 3.15625V2.71875C13 2.60938 12.8906 2.5 12.7812 2.5ZM5.42578 1.81641C5.48047 1.70703 5.64453 1.65234 5.78125 1.625H7.96875C8.07812 1.65234 8.24219 1.70703 8.29688 1.81641L8.84375 2.5H4.90625L5.42578 1.81641ZM11.25 13.4375C11.25 13.6836 11.0312 13.875 10.8125 13.875H2.9375C2.69141 13.875 2.5 13.6836 2.5 13.4375V3.375H11.25V13.4375ZM6.65625 12.5625H7.09375C7.20312 12.5625 7.3125 12.4805 7.3125 12.3438V4.90625C7.3125 4.79688 7.20312 4.6875 7.09375 4.6875H6.65625C6.51953 4.6875 6.4375 4.79688 6.4375 4.90625V12.3438C6.4375 12.4805 6.51953 12.5625 6.65625 12.5625Z" fill="#A4A4A4"/>
                          </svg>
                          remove
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )) : ''}
            </div>
          )}
        </div>
        <div className=' h-max w-full sm:w-[320px] text-graySecondary bg-darkGrey p-6 sm:cta-clip-path relative'>
            <div className='w-full '>
              <div className='flex flex-col gap-2'>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>steam price</div>
                  <span className='flex gap-2 items-center'>
                  <SteamIcon className="text-graySecondary" />
                    ${format(getSteamTotalPrice())}
                  </span>
                </div>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>your discount</div>
                  <span className='text-white'>${format(getDiscount())}</span>
                </div>
                <div className='w-full flex justify-between items-center text-sm '>
                  <div className='uppercase tracking-[1.12px]'>total</div>
                  <span className=' text-2xl leading-6  text-white '>${format(getTotal())}</span>
                </div>
              </div>
            </div>
            <Link href="/cart/checkout">
              <Button
                text='checkout'
                onClick={() => {}}
                className={classNames('bg-skinwalletPink justify-center items-center w-full h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                  cartItems.items.length !== 0 ? '' : 'pointer-events-none opacity-50')}
              />
             </Link>
             <div className='w-full absolute left-0 -top-10 h-10 sm:hidden' style={{ background: 'linear-gradient(180deg, rgba(20, 20, 21, 0.00) 0%, #0D0D0D 100%)' }}/>
          </div>
      </div>
    </div>
    </>
  )
}
