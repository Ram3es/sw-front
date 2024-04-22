import SymbolIcon from '@/components/icons/SymbolIcon'
import ItemCard from '../../../components/Content/ItemCard'
import { type TInventoryCard } from '../../../types/Card'
import { IInventoryCard } from '@/types/Inventory'

export default function CardsListWrapper ({
  renderCards,
  toggleSelect
}: {
  renderCards: IInventoryCard[]
  toggleSelect: (card: IInventoryCard) => void
}) {
  return (
    <>
      {renderCards.length
        ? (
        <div className="px-[24px] py-[30px] grid grid-cols-2 sm:grid-cols-cards gap-1">
          {renderCards.map((card) => (
            <ItemCard
              id={card.id}
              key={card.id}
              name={card.name}
              price={card.price.sell}
              image={card.image}
              type={card.qualities?.type}
              variant={card.variant}
              onClick={() => {
                toggleSelect(card)
              }}
              condition={card.condition}
              isSelected={card.isSelected}
              isTradable= {card.isTradable}
            />
          ))}
        </div>
          )
        : (
        <div className="flex flex-col items-center justify-center w-full h-full text-skinwallerGray font-medium gap-4">
          <SymbolIcon />
          <p>No items to select</p>
        </div>
          )}
    </>
  )
}
