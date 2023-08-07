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
            <IsUserLogged>
              <CardsListWrapper
                renderCards={renderCards}
                toggleSelect={toggleSelect}
              />
            </IsUserLogged>
          </div>
        </div>
      </div>
      <SelectBottomBar
        selectedItemsQty={selectedItemsQty}
        onShowSelected={() => { console.log('show selected') }}
        onCancel={() => { setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isChecked: false } : item)]) }}
        onWithdraw={() => { console.log('onWithdraw') }}
      />
    </div>
  )
}

export default MarketWithdraw
