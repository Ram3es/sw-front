import { Nav } from '../controls/nav'
import { Filters } from '../controls/filters'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IsUserLogged } from '../../../components/IsUserLogged/IsUserLogged'
import ItemCard from '../../../components/Content/ItemCard'
import SellsBar from './SellsBar'
import { type TInventoryCard } from '../../../types/Card'
import { useAppContext } from '../../../context/AppContext'
import { sortData } from '../../../helpers/sortData'
import { useSort } from '../../../helpers/useSort'
import { getInventory } from '../../../services/inventory/inventory'
import SymbolIcon from './SymbolIcon'

export const Inventory = () => {
  const [renderCards, setRenderCards] = useState<TInventoryCard[]>([])
  const [selectedCards, setSellectedCards] = useState<TInventoryCard[]>([])
  const [isSelectedAll, setSelectedAll] = useState(false)
  const { user, gameId } = useAppContext()
  const { currentOption, toggleSort } = useSort()

  const sorted = useMemo(() => sortData(renderCards, 'price', currentOption), [renderCards, currentOption])

  const toggleSelect = (card: TInventoryCard) => {
    setRenderCards(prev => [...prev.map(item => card.id === item.id ? { ...item, isChecked: !item.isChecked } : item)])
    setSellectedCards(prev => {
      const index = prev.findIndex((idx) => idx.id === card.id)
      if (index === -1) {
        return [...prev, card]
      }
      return [...prev.filter(item => item.id !== prev[index].id)]
    })
  }

  const toggleAllSelected = () => {
    if (isSelectedAll) {
      setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isChecked: false } : item)])
      setSellectedCards([])
      setSelectedAll(false)
      return
    }
    setRenderCards(prev => [...prev.map(item => item.isTradable ? { ...item, isChecked: true } : item)])
    setSellectedCards(renderCards.filter(card => card.isTradable))
    setSelectedAll(true)
  }

  useEffect(() => {
    if (selectedCards.length && selectedCards.length < renderCards.filter(card => card.isTradable).length) {
      setSelectedAll(false)
    }
  }, [selectedCards, renderCards])

  const getUserInventory = useCallback(async () => {
    if (user && gameId) {
      const inventory = await getInventory(gameId)
      setRenderCards(Object.values(inventory).map((item: any) => ({ ...item, isTradable: true, isChecked: false })))
    }
  }, [user, gameId])

  useEffect(() => {
    void getUserInventory()
  }, [user, gameId])

  return (
    <div className='flex flex-grow  items-stretch  '>
      <div className='flex flex-col flex-grow py-5'>
        <div className='flex justify-between h-[50px] border-b border-solid border-darkGrey px-[8px]'>
          <Nav />
          <Filters
            onSelectAll={toggleAllSelected}
            isSelectedAll={isSelectedAll}
            toggleSort ={toggleSort}
            isAsc= { currentOption === 'ASC' }
          />
        </div>
        <IsUserLogged>
          {
          renderCards.length
            ? <div className='px-[24px] py-[30px] grid grid-cols-cards gap-1'>
              {sorted.map(card =>
                    <ItemCard
                      key={card.id}
                      onClick={() => { toggleSelect(card) }}
                      isSelected={card.isChecked}
                      {...card}
                    />
              )
              }
              </div>
            : <div className='flex flex-col items-center justify-center w-full h-full text-skinwallerGray font-medium gap-4'>
                <SymbolIcon />
                <p>No items to select</p>
              </div>
          }
        </IsUserLogged>
      </div>
      <SellsBar selectedCards={selectedCards} onClose={toggleSelect} />
    </div>
  )
}
