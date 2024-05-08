import { useEffect, useState } from 'react'
import Dropbox from '@/components/Content/Dropbox'
import Checkbox from '@/components/Content/Checkbox'
import Datepicker from '@/components/Content/Datepicker'
import SidebarLinks from '@/components/Navigation/SidebarLinks'
import { IDefaultFilters, IDefaultOptionRes } from '@/types/Market'
import { generateQuery } from '@/helpers/generateQuery'

interface ITransactionsSidebarProps {
  endDate?: Date
  startDate?: Date
  filters: IDefaultFilters[]
  setEndDate: (date: Date) => void
  setStartDate: (date: Date) => void
  getData: (query?: string) => Promise<void>
}
type TCheckboxFilterState = IDefaultOptionRes & {
  selected: boolean
}

interface IInitFilterState {
  type?: string[]
  search?: string
  from?: Date
  to?: string
}

const TransactionsSidebar = ({ setEndDate, setStartDate, getData, endDate, startDate, filters }: ITransactionsSidebarProps) => {
  const [search, setSearch] = useState('')
  const [checkboxFilterOptions, setCheckboxFilterOptions] = useState<TCheckboxFilterState[]>([])
  const [sideBarFiltersState, setSideBarFilterState]= useState<IInitFilterState | null>(null)

  useEffect(() => {
    if(filters.length){
      const options = filters.find(ftr => ftr.name === 'type')?.options as IDefaultOptionRes[]
      const filterState = options.map(option => ({...option,selected: false }))
      setCheckboxFilterOptions(filterState)
    }
  },
  [filters])

  useEffect(() => {
    if(sideBarFiltersState){
      const query = generateQuery(sideBarFiltersState)
      void getData(query)
    }
  },[sideBarFiltersState])



  return (
    <>
      <div className="p-6 w-full flex flex-col gap-8">
        <Dropbox label="type">
          <div className="flex flex-col w-full gap-3 mt-6">
            {checkboxFilterOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setCheckboxFilterOptions((prev) =>
                    prev.map((item, i) => {
                      if (i === index) {
                        if(item.selected){
                          setSideBarFilterState(prev => {
                            if(prev){
                              return {
                                ...prev,
                                type: prev.type?.filter(el => el !== item.value)
                              }
                            }
                            return prev
                          })
                        } else {
                          setSideBarFilterState(prev => {
                            if(!prev){
                              return { type: [item.value] }
                            }
                            return {
                              ...prev,
                              type: [...prev.type as string[], item.value ]
                            }
                          })
                        }
                        return {
                          ...item,
                          selected: !item.selected
                        }
                      } else {
                        return item
                      }
                    })
                  )
                }}
                className="w-full cursor-pointer flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    <Checkbox checked={item.selected} additionalClasses='pointer-events-none text-black' />
                  </div>
                  <h1 className="font-Barlow text-sm">{item.label}</h1>
                </div>
                <span className="font-Barlow text-xs text-graySecondary font-medium uppercase">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </Dropbox>
        <div className="w-full border-t border-darkGrey" />
        <div className="bg-darkGrey p-3">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
            type="text"
            placeholder="Search items"
            className="w-full bg-transparent border-none outline-none text-graySecondary font-Barlow text-sm"
          />
        </div>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="date range">
          <div className="flex gap-2 mt-6">
            <Datepicker
              additionalClasses=' -translate-x-[5px] sm:-translate-x-4 top-4'
              label="From"
              selectedDate={startDate}
              onChange={(date) => { setStartDate(date)}}
            />
            <Datepicker
              label="To"
              selectedDate={endDate}
              onChange={(date) => { setEndDate(date) }}
              additionalClasses='-translate-x-[124px] top-4'
            />
          </div>
        </Dropbox>
      </div>
      <SidebarLinks />
    </>
  )
}

export default TransactionsSidebar
