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
import { REGEX } from '@/constants/regex';
import React, { useEffect, useMemo, useState } from 'react';

const offersFilter = [
  {
    id: 1,
    name: 'All'
  },
  {
    id: 2,
    name: 'Hot deals'
  },
]

interface IRarityOption {
    name: string
    selected: boolean
    numberOfItems: number
}


const OffersSideBar = () => {
  const [filterId, setFilterId] = useState<number>(1)
  const [patternValue, setPatternValue] = useState('')
  const [lockDays, setLockDays] = useState<number>(8)
  const [isShownAllOptions, setShowAllOptions] = useState(false)
  const [rarityFilters, setRarityFilters] = useState<IRarityOption[]>(
    [
        {
        name: 'Contraband',
        selected: true,
        numberOfItems: 12
        },
        {
        name: 'Covert',
        selected: true,
        numberOfItems: 201
        },
        {
        name: 'Classified',
        selected: true,
        numberOfItems: 98
        },
        {
        name: 'Restricted',
        selected: true,
        numberOfItems: 52
        },
        {
        name: 'Mil-Spec Grade',
        selected: true,
        numberOfItems: 24
        },
        {
        name: 'Industrial Grade',
        selected: true,
        numberOfItems: 17
        },
        {
        name: 'Consumer Grade',
        selected: true,
        numberOfItems: 1
        },
        {
            name: 'Aontraband',
            selected: true,
            numberOfItems: 12
        },
        
        {
            name: 'Contrband',
            selected: true,
            numberOfItems: 12
        },
        
    ]
  )

  const [otherOptions, setOtherOptions] = useState([
    {
      name: 'StarTrak™',
      selected: true
    },
    {
      name: 'Souvenir',
      selected: true
    },
    {
      name: 'Sticker',
      selected: true
    }
  ])

const setOption = (id: number) => {
    setFilterId(id)
}

const handleChangePatternValue = (value: string) => {
    if(REGEX.number.test(value)){
        if(Number(value) > 1000){
            return setPatternValue('1000')
        }
        setPatternValue(value)
    }
}

const renderRarityFilters = useMemo(() => isShownAllOptions ? rarityFilters : rarityFilters.slice(0, 6)
,[isShownAllOptions, rarityFilters])



return (
    <>
        <div className="p-6 w-full flex flex-col gap-8">
        <Dropbox label="offers">
            <RadioGroup
            options={offersFilter}
            setOption={setOption}
            selectedOptionId={filterId}
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
            />
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="rarity">
          <div className="flex flex-col w-full gap-3 mt-6">
            {renderRarityFilters.map((item, index) => (
              <InputWithCheckbox
                key={index}
                isChecked={item.selected}
                setter={(selected) => {
                  setRarityFilters((prev) =>
                  prev.map((item, i) => {
                    if (i === index) {
                        return {
                        ...item,
                        selected
                        }
                    } else {
                        return item
                    }
                    })
                )
                }}
                label={item.name}
            >
              <span className="font-Barlow text-xs text-graySecondary font-medium uppercase">
                {item.numberOfItems}
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
                value={patternValue}
                handleChange={handleChangePatternValue}
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
            {otherOptions.map((item, index) => (
              <InputWithCheckbox
                key={index}
                isChecked={item.selected}
                setter={(selected) => {
                  setOtherOptions((prev) =>
                    prev.map((item, i) => {
                      if (i === index) {
                        return {
                          ...item,
                          selected
                        }
                      } else {
                        return item
                      }
                    })
                  )
                }}
                label={item.name}
              />
            ))}
          </div>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="trade lock">
          <>
            <TradeLockFilterWithChart
              data={[200,120, 40, 160, 80, 20, 50, 90, 140]}
              sliderValue={lockDays}
              onChange={(value) => setLockDays(value)}
              colorsArr={[
                'rgba(24,232,107,1)',
              ]}
              maskId='trade'
            />
            <TradeLockStatuses value={lockDays} />
          </>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
      </div>
      <SidebarLinks />
    </>
    );
};

export default OffersSideBar;