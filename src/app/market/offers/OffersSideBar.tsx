'use client'
import Dropbox from '@/components/Content/Dropbox';
import InputWithCheckbox from '@/components/Content/InputWithCheckbox';
import InputWithErrors from '@/components/Content/InputWithErrors';
import RadioGroup from '@/components/Content/RadioGroup';
import TradeLockStatuses from '@/components/Content/TradeLockStatuses';
import { Button } from '@/components/Navigation';
import SidebarLinks from '@/components/Navigation/SidebarLinks';
import TradeLockFilterWithChart from '@/components/slider/TradeLockFilterWithChart';
import TwoPointsSliderWithChart from '@/components/slider/TwoPointsSliderWithChart';
import { REGEX } from '@/constants/regex';
import { useAppContext } from '@/context/AppContext';
import { useMarketOffersCtx } from '@/context/MarketOffers';
import { classNames } from '@/helpers/className';
import { ESteamAppId } from '@/types/Inventory';
import React, { useMemo, useState } from 'react';

const OffersSideBar = () => {
  const [isShownAllOptions, setShowAllOptions] = useState(false)

  const { gameId } =useAppContext()

  const { 
    isSelectedSideBarFilter,
    sidebarFilters ,
    defaulSideBarStateFilters: initFilters,
    setSideBarFilters,
    updateFilter,
    resetFilters,
    resetSideBarFilters,
    updateFilterWithCheckbox
  } = useMarketOffersCtx()

  const { 
    wear,
    quality,
    variant,
    priceRange,
    rarity,
    pattern,
    tradableIn,
  } = sidebarFilters

  
const setOption = (value: string) => {
  setSideBarFilters(prev => ({ ...prev, variant: {...prev.variant, value } }))
  updateFilter({ variant: value === 'all' ? '' : value })
  
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
            onClick={() => { resetSideBarFilters(); resetFilters()}}
          >
            <div className='absolute w-3 bottom-[3px] -left-[3px] border-b border-graySecondary group-hover:border-white rotate-45 duration-200' />
          </Button>
          {gameId === ESteamAppId.CSGO && 
          <Dropbox label="offers">
            <RadioGroup
            options={variant?.options}
            setOption={(value) => setOption(value as string)}
            selectedOptionId={variant?.value}
            />
        </Dropbox>}
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="price">
            <TwoPointsSliderWithChart
            data={priceRange.data}
            maxPrice={priceRange.options[1]}
            minPrice = {priceRange.options[0]}
            maskId="priceMask"
            rangeLimit={priceRange.value}
            setRangeLimit={(value: number[]) =>{
              setSideBarFilters(prev => ({
                ...prev,
                priceRange: {...prev.priceRange, value}
              }))
            }}
            updateFilterFn={(value) => { 
              const priceFrom = value[0] === initFilters.priceRange.value[0]
                && value[1] === initFilters.priceRange.value[1] 
                  ? null 
                  : value[0]

              const priceTo = value[1] === initFilters.priceRange.value[1] 
                &&  value[0] === initFilters.priceRange.value[0] 
                  ? null 
                  : value[1]

              updateFilter({ priceFrom, priceTo })}}
            />
        </Dropbox>
        {ESteamAppId.CSGO === gameId && (<>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="wear">
            <TwoPointsSliderWithChart
            data={wear?.data}
            maxPrice={wear?.options[1]}
            minPrice={wear?.options[0]}
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
            rangeLimit={wear?.value}
            setRangeLimit={(value: number[]) =>{
              setSideBarFilters(prev => ({
                ...prev,
                wear: {...prev.wear, value }
              }))
            }}
            updateFilterFn={(value) => { 
              const wearFrom = value[0] === initFilters.wear.value[0] 
                && value[1] === initFilters.wear.value[1] 
                  ? null 
                  : value[0] / 1000

              const wearTo = value[1] === initFilters.wear.value[1] 
                &&  value[0] === initFilters.wear.value[0] 
                ? null 
                : value[1] / 1000

              updateFilter({ wearFrom , wearTo })
            }}
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
                  updateFilterWithCheckbox('rarity',option.value)
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
                label={option.label}
            >
              <span className="font-Barlow text-xs text-graySecondary font-medium uppercase">
                {option.count}
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
            {quality.map((option, index) => (
              <InputWithCheckbox
                key={index}
                isChecked={option.selected}
                setter={(selected) => {
                  updateFilterWithCheckbox('quality',option.value)
                  setSideBarFilters((prev) =>({
                    ...prev,
                    quality:  prev.quality.map((item, i) => {
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
                label={option.label}
              >
                <span className="font-Barlow text-xs text-graySecondary font-medium uppercase">
                  {option.count}
                </span>
              </InputWithCheckbox>
            ))}
          </div>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="trade lock">
          <>
            <TradeLockFilterWithChart
              data={tradableIn?.data}
              sliderValue={tradableIn?.value}
              onChange={(value) => {
                setSideBarFilters(prev => ({
                  ...prev,
                  tradableIn: {...prev.tradableIn, value}
                }))
              }}
              updateFilterFn={(value) => {
                 updateFilter({ tradableIn : value === 8 ? null : value })}}
              colorsArr={[
                'rgba(24,232,107,1)',
              ]}
              maskId='trade'
            />
            <TradeLockStatuses value={tradableIn?.value} />
          </>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        </>)}
      </div>
      <SidebarLinks />
    </>
    );
};

export default OffersSideBar;