import { useCallback, useEffect, useMemo, useState } from 'react'
import { IsUserLogged } from '../../components/IsUserLogged/IsUserLogged'
import { classNames } from '../../helpers/className'
import { useHideOnScroll } from '../../helpers/useHideOnScroll'
import { Filters } from '../InstantSell/controls/filters'
import MarketWithdrawSidebar from './MarketWithdrawSidebar'
import SelectBottomBar from './SelectBottomBar'
import { getItemsToWithdraw } from '../../services/market/market'
import { ECardVariant, type TInventoryCard } from '../../types/Card'
import CardsListWrapper from '../InstantSell/inventory/CardsListWrapper'

const MarketWithdraw = () => {
  const shouldHide = useHideOnScroll()
  const [renderCards, setRenderCards] = useState<TInventoryCard[]>([])
  const [isSelectedAll, setSelectedAll] = useState(false)
  const [isOnlySelectedShown, setIsOnlySelectedShown] = useState(false)

  const toggleSelect = (card: TInventoryCard) => {
    setRenderCards(prev => [...prev.map(item => card.id === item.id ? { ...item, isChecked: !item.isChecked } : item)])
  }

  const toggleAllSelected = () => {
    if (isSelectedAll) {
      setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isChecked: false } : item)])
      setSelectedAll(false)
      return
    }
    setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isChecked: true } : item)])
    setSelectedAll(true)
  }

  const selectedItemsQty = useMemo(() => renderCards.reduce((prev, cur) => cur.isChecked ? prev + 1 : prev, 0), [renderCards])
  const cardsToShow = useMemo(() => isOnlySelectedShown ? [...renderCards].filter(c => c.isChecked) : renderCards, [isOnlySelectedShown, renderCards])

  const getItems = useCallback(async () => {
    try {
      const items = await getItemsToWithdraw()
      console.log('items', items)
      setRenderCards(() => items.map((item: any) => ({
        id: item.inventoryItemId,
        name: item.name,
        type: item.typeName,
        variant: ECardVariant.withdraw,
        condition: item.wearFloat,
        price: item.price.amount,
        steamPrice: item.steamPrice.amount,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        image: item.imageUrl ? `https://community.akamai.steamstatic.com/economy/image/${item.imageUrl}` : '',
        isTradable: true,
        isChecked: false
      })))
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    void getItems()
  }, [])

  useEffect(() => {
    if (selectedItemsQty < renderCards.filter(card => card.isTradable).length) {
      setSelectedAll(false)
    }
  }, [renderCards])

  return (
    <div className="flex flex-col flex-grow py-5">
      <div className="flex justify-between items-center h-[50px] border-b border-solid border-darkGrey px-6">
        <div className='uppercase text-white font-["Barlow"] text-sm'>withdraw items</div>
        <Filters
          onSelectAll={toggleAllSelected}
          isSelectedAll={isSelectedAll}
        />
      </div>
      <div className="flex text-white">
        <div
          className={classNames(
            'flex flex-col flex-grow max-w-[256px] max-h-screen sticky overflow-auto bottom-0',
            shouldHide
              ? 'h-[calc(100vh-60px)] top-[60px]'
              : 'h-[calc(100vh-120px)] top-[120px]'
          )}
        >
          <MarketWithdrawSidebar />
        </div>
        <div className="w-full flex flex-col pt-6">
          <div className="flex flex-col flex-grow">
            {isOnlySelectedShown
              ? <div className='px-[24px]'>
                  <div className='flex gap-3 items-center px-3 h-[25px] border border-swViolet rounded-3xl w-max'>
                    <span className='text-white font-["Barlow"] text-sm'>Selected</span>
                    <svg className='cursor-pointer' onClick={() => { setIsOnlySelectedShown(false) }} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.22363 4.92432L9.04004 2.13525L9.61426 1.56104C9.69629 1.479 9.69629 1.34229 9.61426 1.23291L9.0127 0.631348C8.90332 0.549316 8.7666 0.549316 8.68457 0.631348L5.32129 4.02197L1.93066 0.631348C1.84863 0.549316 1.71191 0.549316 1.60254 0.631348L1.00098 1.23291C0.918945 1.34229 0.918945 1.479 1.00098 1.56104L4.3916 4.92432L1.00098 8.31494C0.918945 8.39697 0.918945 8.53369 1.00098 8.64307L1.60254 9.24463C1.71191 9.32666 1.84863 9.32666 1.93066 9.24463L5.32129 5.854L8.11035 8.67041L8.68457 9.24463C8.7666 9.32666 8.90332 9.32666 9.0127 9.24463L9.61426 8.64307C9.69629 8.53369 9.69629 8.39697 9.61426 8.31494L6.22363 4.92432Z" fill="#A4A4A4"/>
                    </svg>
                  </div>
                </div>
              : ''}
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
        onWithdraw={() => { console.log('onWithdraw') }}
      />
    </div>
  )
}

export default MarketWithdraw
