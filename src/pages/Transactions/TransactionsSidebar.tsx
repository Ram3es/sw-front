import { useEffect, useMemo, useState } from 'react'
import Dropbox from '../../components/Content/Dropbox'
import Checkbox from '../../components/Content/Checkbox'
import Datepicker from '../../components/Content/Datepicker'
import {
  PAYMENT_METHODS,
  SIDEBAR_LINKS,
  SOCIAL_LINKS
} from '../../constants/sidebar-links'
import { Link } from 'react-router-dom'
import LanguagePicker from '../../components/Content/LanguagePicker'
import { TRANSACTIONS, type ITransactions } from '../../mock/invoices'

interface ITransactionsSidebarProps {
  setRenderTransactions: React.Dispatch<React.SetStateAction<ITransactions[]>>
}

const TransactionsSidebar = ({ setRenderTransactions }: ITransactionsSidebarProps) => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
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

  const ranged = useMemo(() => TRANSACTIONS.filter(item => {
    const itemDate = new Date(item.date)
    const start = new Date(startDate ?? 0)
    const end = new Date(endDate ?? Date.now())

    return itemDate >= start && itemDate <= end
  }), [endDate, startDate])

  useEffect(() => {
    setRenderTransactions(ranged)
  }, [ranged])

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
      <div className="w-full border-t border-darkGrey" />
      <div className="p-6 w-full flex flex-col gap-8">
        <div className="flex gap-4 items-center flex-wrap">
          {SIDEBAR_LINKS.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="font-['Barlow'] text-xs uppercase text-graySecondary">
                {item.title}
              </div>
              {index !== SIDEBAR_LINKS.length - 1 && (
                <div className="w-[3px] h-[3px] rounded-full bg-graySecondary" />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-['Barlow'] text-xs uppercase text-graySecondary">
            Follow us
          </div>
          <div className="flex gap-6 flex-wrap">
            {SOCIAL_LINKS.map((item, index) => (
              <Link key={index} to={item.path}>
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        <LanguagePicker />
        <div className="flex gap-6 items-center flex-wrap">
          {PAYMENT_METHODS.map((item, index) => (
            <div key={index}>{item.icon}</div>
          ))}
        </div>
        <p className="font-['Barlow'] text-xs text-graySecondary leading-[18px]">
          Powered by Steam.
          <br />
          Not affiliated with Valve Corp.
        </p>
        <p className="font-['Barlow'] text-xs text-graySecondary leading-[18px]">
          Skinwallet MT Limited 99, Sir Adrian Dingli Street, Sliema, Malta
        </p>
        <p className="font-['Barlow'] text-xs text-graySecondary leading-[18px]">
          © 2021 Skinwallet
        </p>
      </div>
    </>
  )
}

export default TransactionsSidebar
