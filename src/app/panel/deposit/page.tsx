"use client"
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ECardVariant, TInventoryCard } from '@/types/Card'
import { useAppContext } from '@/context/AppContext'
import { useSort } from '@/helpers/useSort'
import { sortData } from '@/helpers/sortData'
import { getInventory } from '@/services/inventory/inventory'
import { IsUserLogged } from '@/components/IsUserLogged/IsUserLogged'
import CardsListWrapper from './CardsListWrapper'
import SellsBar from './SellsBar'
import { Filters } from '@/components/InstantSellControls/filters'
import { Nav } from '@/components/InstantSellControls/nav'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel | Deposit | Skinwallet Instant',
  description: 'Sell your CSGO skins fast and cash out instantly for PayPal, WebMoney. Log in with your Steam, evaluate your inventory, sell skins and send money to your PayPal, WebMoney in 5 minutes.',
}

export default function Deposit() {
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
      setRenderCards(Object.values(inventory).map((item: any) => (
        {
          ...item,
          variant: ECardVariant.sell,
          isTradable: true,
          isChecked: false,
          condition: 0.3435533 
        })))
    }
  }, [user, gameId])

  useEffect(() => {
    void getUserInventory()
  }, [user, gameId])

  return (
      <div className='flex flex-grow  items-stretch  '>
        <div className='flex flex-col flex-grow py-5'>
          <div className='flex justify-between h-auto xl:h-[50px] xl:border-b border-solid border-darkGrey xl:px-[8px] flex-wrap xl:flex-nowrap'>
            <Nav />
            <Filters
              onSelectAll={toggleAllSelected}
              isSelectedAll={isSelectedAll}
              toggleSort ={toggleSort}
              isAsc= { currentOption === 'ASC' }
              onReaload={() => { console.log('reload') }}
            />
          </div>
          <IsUserLogged>
            <CardsListWrapper
              renderCards={sorted}
              toggleSelect={toggleSelect}
            />
          </IsUserLogged>
        </div>
        <SellsBar selectedCards={selectedCards} onClose={toggleSelect} />
      </div>
  )
}