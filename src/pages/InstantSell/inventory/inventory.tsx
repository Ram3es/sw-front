import { Nav } from '../controls/nav';
import { Filters } from '../controls/filters';
import { useEffect, useState } from 'react';
import { NotLogged } from '../../../components/NotLogged/NotLogged';
import ItemCard from '../../../components/Content/ItemCard';
import { Button } from '../../../components/Navigation';
import SellsBar from './SellsBar';
import { TInventoryCard } from '../../../types/Card';
import { USER_INVENTORY } from '../../../mock/inventory';
import { useAppContext } from '../../../context/AppContext';



export const Inventory = () => {
  const [renderCards, setRenderCards] = useState<TInventoryCard[]>([])
  const [selectedCards, setSellectedCards] = useState<TInventoryCard[]>([]);
  const { user, userUpdate } = useAppContext();
  const toggleSelect = (card: TInventoryCard) => {
    setRenderCards(prev => [...prev.map( item => card.id === item.id ? {...item, isChecked: !item.isChecked} : item)])
    setSellectedCards(prev => {
      const index = prev.findIndex((idx) => idx.id === card.id );
      if(index === -1){
        return [...prev, card]
      }
      return [...prev.filter( item => item.id !== prev[index].id) ]
    })
  }

  useEffect(() => {
    setRenderCards(USER_INVENTORY.map(item => ({...item, isChecked: false })))
  },[USER_INVENTORY])
 

  return (
    <div className='flex flex-grow'>
      <div className='flex flex-col flex-grow py-5'>
        <div className='flex justify-between h-[50px] border-b border-solid border-darkGrey px-[8px]'>
          <Nav />
          <Filters
            onSelectAll={() => {
              setRenderCards(prev => [...prev.map( item => item.isTradable ? {...item, isChecked: true} : item)])
              setSellectedCards(renderCards.filter(card => card.isTradable))
            }}
          />
        </div>
        {
          user
            ? <div className='px-[24px] py-[30px] grid grid-cols-cards gap-1'>
              {renderCards.map(card => 
                    <ItemCard 
                      key={card.id} 
                      onClick={() => toggleSelect(card)}
                      isSelected={card.isChecked}
                      {...card} 
                      />
                   )
              }
              </div>
           : <NotLogged
              onLogIn={() => userUpdate()}
           />
        }
      </div>
      <SellsBar selectedCards={selectedCards} onClose={toggleSelect} />
    </div>
  );
};