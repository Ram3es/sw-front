import { Button } from '@/components/Navigation'
import { classNames } from '@/helpers/className'

const SelectBottomBar = ({ selectedItemsQty, onShowSelected, onCancel, onWithdraw }: { selectedItemsQty: number, onShowSelected: () => void, onCancel: () => void, onWithdraw: () => void }) => {
  return (
    <div className="fixed left-0 bottom-0 w-full z-40 p-6 flex flex-col lg:flex-row gap-2 lg:gap-12 font-Barlow items-center bg-graySecondary text-darkSecondary">
      <div className="flex flex-col w-max">
        {selectedItemsQty === 0
          ? <span className="text-18 font-medium w-max">No items selected</span>
          : <>
              <span className="text-18 font-medium w-max">{selectedItemsQty} item{selectedItemsQty > 1 ? 's' : ''} selected</span>
              <span
                onClick={onShowSelected}
                className="text-xs font-medium uppercase cursor-pointer w-max"
              >show selected items</span>
            </>
        }
      </div>
      <p className="w-full text-sm font-normal">Selected items will be transferred to your Steam Inventory for in-game use. Items with a Trade Lock cannot be transferred.</p>
      <div className={classNames(
        'w-full lg:w-max flex gap-4',
        selectedItemsQty < 1 ? ' opacity-50' : ''
      )}>
        <Button
            text='cancel'
            onClick={() => { if (selectedItemsQty > 0) onCancel() }}
            heightClass="h-10"
            className='justify-center relative uppercase w-full lg:w-auto text-darkSecondary font-semibold border border-darkSecondary cta-clip-path '
        >
          <span className='absolute -left-[1px] bottom-[3px] w-[10px] rotate-45 border-t border-darkGrey' />
        </Button>
        <Button
            text='withdraw'
            onClick={() => { if (selectedItemsQty > 0) onWithdraw() }}
            heightClass="h-10"
            className='justify-center uppercase bg-darkSecondary w-full lg:w-auto text-white font-semibold border border-darkSecondary cta-clip-path '
        />
      </div>
    </div>
  )
}

export default SelectBottomBar
