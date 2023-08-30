import { useState } from 'react'
import Dropbox from '../../components/Content/Dropbox'
import TwoPointsSliderWithChart from '../../components/slider/TwoPointsSliderWithChart'
import SidebarLinks from '../../components/Navigation/SidebarLinks'
import RadioGroup from '../../components/Content/RadioGroup'
import { useAppContext } from '../../context/AppContext'
import { ESteamAppId } from '../../types/Inventory'
import InputWithCheckbox from '../../components/Content/InputWithCheckbox'

const maxPrice = 1000

const MarketWithdrawSidebar = () => {
  const { updateGameId, gameId } = useAppContext()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([
    {
      name: 'Knives',
      selected: true,
      numberOfItems: 12
    },
    {
      name: 'Pistols',
      selected: true,
      numberOfItems: 201
    },
    {
      name: 'Heavy',
      selected: true,
      numberOfItems: 98
    },
    {
      name: 'SMGs',
      selected: true,
      numberOfItems: 52
    },
    {
      name: 'Rifles',
      selected: true,
      numberOfItems: 24
    },
    {
      name: 'Gloves',
      selected: true,
      numberOfItems: 17
    },
    {
      name: 'Keys',
      selected: true,
      numberOfItems: 1
    }
  ])
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

  return (
    <>
      <div className="p-6 w-full flex flex-col gap-8">
        <Dropbox label="games">
          <RadioGroup
            options={Object.keys(ESteamAppId).map((key) => ({
              id: ESteamAppId[
                key as keyof typeof ESteamAppId
              ] as unknown as number,
              name: key
            }))}
            setOption={(id) => {
              updateGameId(id as unknown as ESteamAppId)
            }}
            selectedOptionId={gameId as unknown as number}
          >
            <span className="text-graySecondary font-font-Barlow text-xs">
              0
            </span>
          </RadioGroup>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <div className="bg-darkGrey p-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            type="text"
            placeholder="Search in Inventory"
            className="w-full bg-transparent border-none outline-none text-graySecondary font-Barlow text-sm"
          />
        </div>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="category">
          <div className="flex flex-col w-full gap-3 mt-6">
            {category.map((item, index) => (
              <InputWithCheckbox
                key={index}
                isChecked={item.selected}
                setter={(selected) => {
                  setCategory((prev) =>
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
          </div>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="price">
          <TwoPointsSliderWithChart
            data={[120, 40, 160, 80, 0, 10, 150]}
            maxPrice={maxPrice}
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
      </div>
      <SidebarLinks />
    </>
  )
}

export default MarketWithdrawSidebar
