"use client"
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IsUserLogged } from '@/components/IsUserLogged/IsUserLogged'
import { classNames } from '@/helpers/className'  
import { useHideOnScroll } from '@/helpers/useHideOnScroll'
import { Filters } from '@/components/InstantSellControls/filters'
import CardsListWrapper from '@/app/panel/deposit/CardsListWrapper'
import MarketWithdrawSidebar from './MarketWithdrawSidebar'
import SelectBottomBar from './SelectBottomBar'
import { getItemsToWithdraw, withdrawItems } from '@/services/market/market'
import { ECardVariant, type TInventoryCard } from '@/types/Card'
import {  makeTradeOffer } from '@/services/inventory/inventory'
import { IInventoryCard, IMakeTradeOffer, ITradeItem } from '@/types/Inventory'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import { getImageURL } from '@/helpers/getImageURL'
import { checkTradeAbility } from '@/services/settings/general'
import TradeModal from '@/components/modals/TradeModal'


export default function MarketWithdraw() {
  const shouldHide = useHideOnScroll()
  const [renderCards, setRenderCards] = useState<IInventoryCard[]>([])
  const [isSelectedAll, setSelectedAll] = useState(false)
  const [isOnlySelectedShown, setIsOnlySelectedShown] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalVariant, setModalVariant] = useState<string>('')

  const router = useRouter()
  const { showToast } = useAppContext()

  const toggleSelect = (card: IInventoryCard) => {
    setRenderCards(prev => [...prev.map(item => card.id === item.id ? { ...item, isSelected: !item.isSelected } : item)])
  }

  const toggleAllSelected = () => {
    if (isSelectedAll) {
      setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isSelected: false } : item)])
      setSelectedAll(false)
      return
    }
    setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isSelected: true } : item)])
    setSelectedAll(true)
  }

  const selectedItemsQty = useMemo(() => renderCards.reduce((prev, cur) => cur.isSelected ? prev + 1 : prev, 0), [renderCards])
  const cardsToShow = useMemo(() => isOnlySelectedShown ? [...renderCards].filter(c => c.isSelected) : renderCards, [isOnlySelectedShown, renderCards])

  const getItems = useCallback(async () => {
    try {
      const items = await getItemsToWithdraw()
      setRenderCards(() => items.map((item: any) => ({
        id: item.assetid,
        type: item.typeName,
        variant: ECardVariant.withdraw,
        condition: item.wearFloat,
        steamPrice: item.price.sell,
        image: getImageURL(item.icon_url),
        isInWithdraw: item.withdrawn,
        isTradable: item.tradable,
        isSelected: false,
        ...item
      })))
    } catch (error) {
     
      console.log(error)
      showToast(error as string)
    }
  }, [])

  const withdtraw = async () => {
    const itemsToOffer: IMakeTradeOffer[] = renderCards.filter(card => card.isSelected)
      .map((card) => ({
        appid: card.appid,
        assetid: card.assetid,
        classid: card.classid,
        steamid: card.steamid,
        instanceid: card.instanceid,
        name: card.name,
        amount: card.amount,
        price: card.price.sell,
        tradable: card.tradable,
      }))
    try {
         await makeTradeOffer(itemsToOffer)
         router.push('/market/withdraw')
    } catch (error) {
      if(axios.isAxiosError(error)){
        showToast(error.message)
      }
      console.log(error)
    }
  }

  const checkTradeAccount = useCallback(async () => {
    try {
      const data = await checkTradeAbility()
      if(data.status !== 'success'){
        setIsOpenModal(true)
        setModalVariant(data.status)
      }
      
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    void checkTradeAccount()
    void getItems()
  }, [])

  useEffect(() => {
    if (selectedItemsQty < renderCards.filter(card => card.isTradable).length) {
      setSelectedAll(false)
    }
  }, [renderCards])

  return (
    <div className="flex flex-col flex-grow py-5">
      <div className=" flex justify-between items-center h-[50px] border-b border-solid border-darkGrey px-6">
        <div className='uppercase text-white font-Barlow text-sm shrink-0 mr-4'>withdraw items</div>
        <Filters
          onSelectAll={toggleAllSelected}
          isSelectedAll={isSelectedAll}
        />
      </div>
      <div className="flex text-white">
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
            {/* <MarketWithdrawSidebar /> */}
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
              {isOnlySelectedShown
                ? <div className='flex gap-3 items-center px-3 h-[25px] border border-swViolet rounded-3xl w-max'>
                  <span className='text-white font-Barlow text-sm'>Selected</span>
                  <svg className='cursor-pointer' onClick={() => { setIsOnlySelectedShown(false) }} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.22363 4.92432L9.04004 2.13525L9.61426 1.56104C9.69629 1.479 9.69629 1.34229 9.61426 1.23291L9.0127 0.631348C8.90332 0.549316 8.7666 0.549316 8.68457 0.631348L5.32129 4.02197L1.93066 0.631348C1.84863 0.549316 1.71191 0.549316 1.60254 0.631348L1.00098 1.23291C0.918945 1.34229 0.918945 1.479 1.00098 1.56104L4.3916 4.92432L1.00098 8.31494C0.918945 8.39697 0.918945 8.53369 1.00098 8.64307L1.60254 9.24463C1.71191 9.32666 1.84863 9.32666 1.93066 9.24463L5.32129 5.854L8.11035 8.67041L8.68457 9.24463C8.7666 9.32666 8.90332 9.32666 9.0127 9.24463L9.61426 8.64307C9.69629 8.53369 9.69629 8.39697 9.61426 8.31494L6.22363 4.92432Z" fill="#A4A4A4" />
                  </svg>
                </div>
                : ''}
            </div>
            <IsUserLogged>
              <CardsListWrapper
                renderCards={cardsToShow}
                toggleSelect={toggleSelect}
              />
            </IsUserLogged>
          </div>
        </div>
      </div>
      <SelectBottomBar
        selectedItemsQty={selectedItemsQty}
        onShowSelected={() => { setIsOnlySelectedShown(prev => !prev) }}
        onCancel={() => { setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isChecked: false } : item)]) }}
        onWithdraw={() => { void withdtraw() }}
      />
      <TradeModal isOpen={isOpenModal} variant={modalVariant} />
    </div>
  )
}
