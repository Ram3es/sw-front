'use client'
import { classNames } from "@/helpers/className";
import OffersHeader from "./OffersHeader";
import OffersSideBar from "./OffersSideBar";
import { useHideOnScroll } from "@/helpers/useHideOnScroll";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ItemCard from "@/components/Content/ItemCard";
import { ECardVariant } from "@/types/Card";
import { useCartContext } from "@/context/CartContext";
import { useAppContext } from "@/context/AppContext";
import { IsUserLogged } from "@/components/IsUserLogged/IsUserLogged";
import { useMarketOffersCtx } from "@/context/MarketOffers";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Content/Loader";
import { getImageURL } from "@/helpers/getImageURL";


export default function MarketOffers () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const shouldHide = useHideOnScroll()
  const { addToCart } = useCartContext()
  const { user } = useAppContext()
  const { push } = useRouter()
  const {
    renderCards,
    hasMore,
    isLoading,
    getFilteredItems,
    updatePage,
  } = useMarketOffersCtx()
  const searchParams = useSearchParams()
  
const observer = useRef<IntersectionObserver | null>(null)

  const lastElementRef = useCallback(
      (node: HTMLElement) => {
        if(observer.current || !hasMore) observer.current?.disconnect()
        observer.current = new IntersectionObserver((element) => {
         if(element[0].isIntersecting && hasMore) updatePage()
         })
        
        if(node) observer.current?.observe(node)
        
    }, [hasMore])

   useEffect(() => {
    if(!searchParams.toString())
    getFilteredItems()
   },[searchParams])

    return(
      <>
        <OffersHeader />
        <div className="flex text-white mt-5">
          <div className={classNames('w-full duration-100 lg:max-w-[256px] bg-darkSecondary lg:bg-transparent fixed lg:sticky justify-center flex z-30 ',
            isSidebarOpen ? ' left-0' : ' -left-full',
            shouldHide
              ? 'top-[60px]'
              : 'top-[120px]')}>
            <div
              className={classNames(
                'flex flex-col flex-grow max-w-[256px] pt-10 lg:pt-0 max-h-screen overflow-auto',
                shouldHide
                  ? 'h-[calc(100vh-60px)] top-[60px]'
                  : 'h-[calc(100vh-120px)] top-[120px]' 
              )}
            >
              <div className={classNames('flex ml-6 lg:hidden items-center gap-2',
                isSidebarOpen ? 'text-white' : 'text-graySecondary'
              )}
                onClick={() => { setIsSidebarOpen(prev => !prev) }}>
                <span className='font-Barlow text-[17px]'>FILTERS</span>
                <svg className={classNames(isSidebarOpen ? '' : 'rotate-180')} width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.30811 7.3706L4.52686 7.1792C4.63623 7.04248 4.63623 6.85107 4.52686 6.71435L2.22998 4.44482L12.4839 4.44482C12.6753 4.44482 12.812 4.28076 12.812 4.1167L12.812 3.84326C12.812 3.65186 12.6753 3.51514 12.4839 3.51514L2.22998 3.51514L4.52686 1.21826C4.63623 1.08154 4.63623 0.890136 4.52686 0.753417L4.30811 0.562011C4.19873 0.425292 3.97998 0.425292 3.84326 0.562011L0.671387 3.73389C0.534668 3.8706 0.534668 4.06201 0.671387 4.19873L3.84326 7.3706C3.97998 7.50732 4.19873 7.50732 4.30811 7.3706Z" fill="currentColor" />
                </svg>
              </div>
              <OffersSideBar/>
            </div>
          </div>
          <div className="w-full flex flex-col pt-6">
          <div className="flex flex-col flex-grow">
            <div className='px-[24px] flex justify-between'>
              <div className={classNames('flex lg:hidden items-center gap-2',
                isSidebarOpen ? 'text-white' : 'text-graySecondary'
              )}
                onClick={() => { setIsSidebarOpen(prev => !prev) }}>
                <span className='font-Barlow text-[17px]'>FILTERS</span>
                <svg className={classNames(isSidebarOpen ? '' : 'rotate-180')} width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.30811 7.3706L4.52686 7.1792C4.63623 7.04248 4.63623 6.85107 4.52686 6.71435L2.22998 4.44482L12.4839 4.44482C12.6753 4.44482 12.812 4.28076 12.812 4.1167L12.812 3.84326C12.812 3.65186 12.6753 3.51514 12.4839 3.51514L2.22998 3.51514L4.52686 1.21826C4.63623 1.08154 4.63623 0.890136 4.52686 0.753417L4.30811 0.562011C4.19873 0.425292 3.97998 0.425292 3.84326 0.562011L0.671387 3.73389C0.534668 3.8706 0.534668 4.06201 0.671387 4.19873L3.84326 7.3706C3.97998 7.50732 4.19873 7.50732 4.30811 7.3706Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <IsUserLogged>
              {!renderCards.length
                ? <div className="self-center my-auto -translate-y-12 text-2xl  text-graySecondary ">No offers found</div>
                :
              <div className="px-[24px] py-[30px] grid grid-cols-2 sm:grid-cols-cards gap-1">
                {renderCards.map((item, idx) => (
                  <ItemCard
                  forwardRef={ idx + 1 === renderCards.length ? lastElementRef : null}
                  key={item.assetid + idx}
                  id={item.assetid}
                  variant={ECardVariant.market}
                  isTradable={item.tradable}
                  name={item.name}
                  type={item.qualities.type}
                  condition={0.2087172418832779} //wearFloat
                  price={item.price.buy}
                  steamPrice={item.price.trade}
                  image={getImageURL(item.icon_url, 192)}
                  colorName={item.qualities.name_color}
                  // onClick={() => push(`/market/offers/${item.assetid}`) } 
                  onClick= {() => {}} //need to implement getting item by id
                  submitFn={(e) => {
                    e.stopPropagation()
                    if (user?.id){
                      addToCart(item)
                    }
                  }}
                    />
                ))}
              </div>
               }
            </IsUserLogged>
            <div className={classNames('mb-10', isLoading ? 'block': 'hidden' )}>
              <Loader/>
            </div>
          </div>
        </div>
        </div>
      </>
    )
}