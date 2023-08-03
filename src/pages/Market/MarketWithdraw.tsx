import { IsUserLogged } from '../../components/IsUserLogged/IsUserLogged'
import { classNames } from '../../helpers/className'
import { useHideOnScroll } from '../../helpers/useHideOnScroll'
import { Filters } from '../InstantSell/controls/filters'
import MarketWithdrawSidebar from './MarketWithdrawSidebar'
import SelectBottomBar from './SelectBottomBar'

const MarketWithdraw = () => {
  const shouldHide = useHideOnScroll()

  return (
    <div className="flex flex-col flex-grow py-5">
      <div className="flex justify-between items-center h-[50px] border-b border-solid border-darkGrey px-6">
        <div className='uppercase text-white font-["Barlow"] text-sm'>withdraw items</div>
        <Filters
          onSelectAll={() => {
            console.log('select all')
          }}
          isSelectedAll={false}
          toggleSort={() => {
            console.log('toggle sort')
          }}
          isAsc={true}
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
              <>cards</>
              {/* {
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
            } */}
            </IsUserLogged>
          </div>
        </div>
      </div>
      <SelectBottomBar
        selectedItemsQty={0}
        onShowSelected={() => { console.log('show selected') }}
        onCancel={() => { console.log('cancel') }}
        onWithdraw={() => { console.log('onWithdraw') }}
      />
    </div>
  )
}

export default MarketWithdraw
