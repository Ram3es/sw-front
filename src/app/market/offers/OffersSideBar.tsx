'use'
import Dropbox from '@/components/Content/Dropbox';
import InputWithCheckbox from '@/components/Content/InputWithCheckbox';
import InputWithErrors from '@/components/Content/InputWithErrors';
import RadioGroup from '@/components/Content/RadioGroup';
import TradeLockStatuses from '@/components/Content/TradeLockStatuses';
import { Button } from '@/components/Navigation';
import SidebarLinks from '@/components/Navigation/SidebarLinks';
import TradeLockFilterWithChart from '@/components/slider/TradeLockFilterWithChart';
import TwoPointsSliderWithChart from '@/components/slider/TwoPointsSliderWithChart';
import { OFFERS_FILTER } from '@/constants/market-offers';
import { REGEX } from '@/constants/regex';
import { useMarketOffersCtx } from '@/context/MarketOffers';
import { classNames } from '@/helpers/className';
import React, { useMemo, useState } from 'react';

const OffersSideBar = () => {
  const [isShownAllOptions, setShowAllOptions] = useState(false)
  const [offersId, setOffersId] = useState(1)

  const { 
    isSelectedSideBarFilter,
    sidebarFilters,
    setSideBarFilters,
    updateFilter,
    resetSideBarFilters,
    updateFilterWithCheckbox
     
  } = useMarketOffersCtx()

  const { 
    wear,
    other,
    price,
    rarity,
    pattern,
    tradableIn,

     
  } = sidebarFilters


const setOption = (id: number) => {
  setOffersId(id)
  const offers = OFFERS_FILTER.find(item => item.id === id)?.filter
  if(offers){
    updateFilter({ offers })
  }
}

const handleChangePatternValue = (value: string) => {
    if(REGEX.number.test(value)){
        if(Number(value) > 1000){
            return setSideBarFilters(prev => ({
              ...prev,
              pattern: '1000'
            }))
        }
        setSideBarFilters(prev => ({
          ...prev,
          pattern: value
        }))
    }
}

const renderRarityFilters = useMemo(() => isShownAllOptions ? rarity : rarity.slice(0, 6)
,[isShownAllOptions, rarity])



return (
    <>
        <div className="p-6 w-full flex flex-col gap-8">
          <Button
            text='reset filters'
            className={classNames('mt-2 relative w-full border border-graySecondary group hover:text-white hover:border-white justify-center cta-clip-path uppercase text-graySecondary duration-200',
             isSelectedSideBarFilter ? '' : 'pointer-events-none opacity-50' )}
            heightClass='h-8'
            onClick={resetSideBarFilters}
          >
            <div className='absolute w-3 bottom-[3px] -left-[3px] border-b border-graySecondary group-hover:border-white rotate-45 duration-200' />
          </Button>
        <Dropbox label="offers">
            <RadioGroup
            options={OFFERS_FILTER}
            setOption={setOption}
            selectedOptionId={offersId}
            >
            <span className="text-graySecondary font-font-Barlow text-xs my-auto">
                0
            </span>
            </RadioGroup>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="price">
            <TwoPointsSliderWithChart
            data={[120, 40, 160, 80, 0, 5, 7, 10, 150, 200]}
            maxPrice={1000000}
            maskId="priceMask"
            rangeLimit={price}
            setRangeLimit={(value: number[]) =>{
              setSideBarFilters(prev => ({
                ...prev,
                price: value
              }))
            }}
            updateFilterFn={() => { updateFilter({ priceFrom: price[0], priceTo: price[1]  })}}
            />
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="wear">
            <TwoPointsSliderWithChart
            data={[120, 40, 160, 80, 130]}
            maxPrice={1000}
            barWidthArr={[0.07, 0.08, 0.22, 0.07, 0.56]}
            colorsArr={[
            'rgba(24,232,107,1)',
            'rgba(61,178,110,1)',
            'rgba(250,203,83,1)',
            'rgba(151,96,45,1)',
            'rgba(66,66,66,1)'
            ]}
            maskId="wearMask"
            isCurrency={false}
            rangeLimit={wear}
            setRangeLimit={(value: number[]) =>{
              setSideBarFilters(prev => ({
                ...prev,
                wear: value
              }))
            }}
            updateFilterFn={() => { updateFilter({ wearFrom: wear[0], wearTo: wear[1] })}}
            />
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="rarity">
          <div className="flex flex-col w-full gap-3 mt-6">
            {renderRarityFilters.map((option, index) => (
              <InputWithCheckbox
                key={index}
                isChecked={option.selected}
                setter={(selected) => {
                  updateFilterWithCheckbox('rarity',option.name)
                  setSideBarFilters((prev) => ({
                    ...prev,
                    rarity: prev.rarity.map((item, i) => {
                      if (i === index) {
                          return {
                          ...item,
                          selected
                          }
                      } else {
                          return item
                      }
                      })
                  })
                )
                }}
                label={option.name}
            >
              <span className="font-Barlow text-xs text-graySecondary font-medium uppercase">
                {option.numberOfItems}
              </span>
            </InputWithCheckbox>
            ))}
            <Button
              text={isShownAllOptions ? 'show less' : 'show more'}
              className=' mt-2 relative w-full border border-graySecondary group hover:text-white hover:border-white justify-center cta-clip-path uppercase text-graySecondary duration-200'
              heightClass='h-8'
              onClick={() => setShowAllOptions( boolean => !boolean)}
            >
              <div className='absolute w-3 bottom-[3px] -left-[3px] border-b border-graySecondary group-hover:border-white rotate-45 duration-200' />
            </Button>
          </div>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="pattern">
          <div className='mt-4 p-2'>
            <InputWithErrors 
                label='Value (0 - 1000)'
                value={pattern}
                handleChange={handleChangePatternValue}
                handleBlur={() => (pattern || pattern === '') && updateFilter({ pattern: pattern })}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='h-[44px] px-[12px] text-sm bg-darkGrey border-2 border-darkGrey z-[10]'
                variant='coupon'
                couponLabelClasses=' text-sm text-graySecondary px-3 '         
            />
          </div>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="other">
          <div className="flex flex-col w-full gap-3 mt-6">
            {other.map((option, index) => (
              <InputWithCheckbox
                key={index}
                isChecked={option.selected}
                setter={(selected) => {
                  updateFilterWithCheckbox('quality',option.filter)
                  setSideBarFilters((prev) =>({
                    ...prev,
                    other:  prev.other.map((item, i) => {
                      if (i === index) {
                        return {
                          ...item,
                          selected
                        }
                      } else {
                        return item
                      }
                    })
                  })
                  )
                }}
                label={option.name}
              />
            ))}
          </div>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="trade lock">
          <>
            <TradeLockFilterWithChart
              data={[200,120, 40, 160, 80, 20, 50, 90, 140]}
              sliderValue={tradableIn}
              onChange={(value) => {
                setSideBarFilters(prev => ({
                  ...prev,
                  tradableIn: value
                }))
              }}
              updateFilterFn={() => { updateFilter({ tradableIn })}}
              colorsArr={[
                'rgba(24,232,107,1)',
              ]}
              maskId='trade'
            />
            <TradeLockStatuses value={tradableIn} />
          </>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
      </div>
      <SidebarLinks />
    </>
    );
};

export default OffersSideBar;