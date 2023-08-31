import SymbolIcon from '@/components/icons/SymbolIcon'
import ItemCard from '../../../components/Content/ItemCard'
import { type TInventoryCard } from '../../../types/Card'

const CardsListWrapper = ({
  renderCards,
  toggleSelect
}: {
  renderCards: TInventoryCard[]
  toggleSelect: (card: TInventoryCard) => void
}) => {
  return (
    <>
      {renderCards.length
        ? (
        <div className="px-[24px] py-[30px] grid grid-cols-2 sm:grid-cols-cards gap-1">
          {renderCards.map((card) => (
            <ItemCard
              key={card.id}
              onClick={() => {
                toggleSelect(card)
              }}
              isSelected={card.isChecked}
              {...card}
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

export default CardsListWrapper
