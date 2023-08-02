import { useState } from 'react'
import Dropbox from '../../components/Content/Dropbox'
import Checkbox from '../../components/Content/Checkbox'
import Datepicker from '../../components/Content/Datepicker'
import SidebarLinks from '../../components/Navigation/SidebarLinks'

interface ITransactionsSidebarProps {
  endDate?: Date
  startDate?: Date
  setEndDate: (date: Date) => void
  setStartDate: (date: Date) => void
}

const TransactionsSidebar = ({ setEndDate, setStartDate, endDate, startDate }: ITransactionsSidebarProps) => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState([
    {
      name: 'Instant Sell',
      selected: false,
      numberOfItems: 0
    },
    {
      name: 'Purchase',
      selected: false,
      numberOfItems: 7
    },
    {
      name: 'Withdraw',
      selected: false,
      numberOfItems: 2
    },
    {
      name: 'Deposit',
      selected: false,
      numberOfItems: 1
    },
    {
      name: 'Prize',
      selected: false,
      numberOfItems: 12
    }
  ])

  return (
    <>
      <div className="p-6 w-full flex flex-col gap-8">
        <Dropbox label="type">
          <div className="flex flex-col w-full gap-3 mt-6">
            {type.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setType((prev) =>
                    prev.map((item, i) => {
                      if (i === index) {
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
                  <h1 className="font-['Barlow'] text-sm">{item.name}</h1>
                </div>
                <span className="font-['Barlow'] text-xs text-graySecondary font-medium uppercase">
                  {item.numberOfItems}
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
            className="w-full bg-transparent border-none outline-none text-graySecondary font-['Barlow'] text-sm"
          />
        </div>
        <div className="w-full border-t border-darkGrey" />
        <Dropbox label="date range">
          <div className="flex gap-2 mt-6">
            <Datepicker
              align="left"
              label="From"
              selectedDate={startDate}
              onChange={(date) => { setStartDate(date) }}
            />
            <Datepicker
              align="right"
              label="To"
              selectedDate={endDate}
              onChange={(date) => { setEndDate(date) }}
            />
          </div>
        </Dropbox>
      </div>
      <SidebarLinks />
    </>
  )
}

export default TransactionsSidebar
