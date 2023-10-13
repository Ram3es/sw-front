'use client'
import { classNames } from "@/helpers/className";
import OffersHeader from "./OffersHeader";
import OffersSideBar from "./OffersSideBar";
import { useHideOnScroll } from "@/helpers/useHideOnScroll";
import { useEffect, useState } from "react";
import ItemCard from "@/components/Content/ItemCard";
import { ECardVariant } from "@/types/Card";
import { IMAGE_ROOT_URL } from "@/constants/strings";
import { useCartContext } from "@/context/CartContext";
import { useAppContext } from "@/context/AppContext";
import { IsUserLogged } from "@/components/IsUserLogged/IsUserLogged";
import { useMarketOffersCtx } from "@/context/MarketOffers";
import { useRouter } from "next/navigation";

export default function MarketOffers () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const shouldHide = useHideOnScroll()
  const { addToCart } = useCartContext()
  const { user, gameId } = useAppContext()
  const { push } = useRouter()
  const {
    renderCards,
    filtersState,
    headerFilterOptions,
    setDefaultFilters,
    getFilteredItems,
  } = useMarketOffersCtx()

  useEffect(() => {
   
    if(Object.values(filtersState).filter(filt => !!filt).length){
      const queryContainer: Array<string[]> = []

      if(!filtersState.appId){
        queryContainer.push([`appId=${gameId}`])
      }
      if(!filtersState.sortBy){
        queryContainer.push([`sortBy=${ headerFilterOptions.sortBy}`])
      }
     
      Object.entries(filtersState).forEach(([key, value]) =>{
      if(Array.isArray(value) ){
        if(!value.length) return

        return queryContainer.push([`${key}=${value.join()}`])   
      }
      if(value || value === 0 ){
          queryContainer.push([`${key}=${value}`])
      }


   })
     const filtersQuery = queryContainer.join('&')
     void getFilteredItems(filtersQuery)
    }
   
   }, [filtersState])

   useEffect(() => {
    if(!gameId) return
    setDefaultFilters(gameId)
   }, [gameId])

  
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
              <div className="px-[24px] py-[30px] grid grid-cols-2 sm:grid-cols-cards gap-1">
                {renderCards.map((item) => (
                  <ItemCard
                  key={item.inventoryItemId}
                  id={item.inventoryItemId}
                  variant={ECardVariant.market}
                  isTradable={true}
                  name={item.name}
                  type={item.typeName}
                  condition={item.wearFloat}
                  price={item.price.amount}
                  steamPrice={item.steamPrice.amount}
                  image={IMAGE_ROOT_URL.concat(item.imageUrl)}
                  onClick={() => push(`/market/offers/${item.inventoryItemId}`) }
                  submitFn={(e) => {
                    e.stopPropagation()
                    if (user?.id){
                      addToCart(item)
                    }
                  }}
                    />
                ))}
              </div>
            </IsUserLogged>
          </div>
        </div>
        </div>
      </>
    )
}