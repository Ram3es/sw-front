import { useEffect, type MouseEvent, useCallback, useState, useMemo } from 'react'
import Bar from '../../components/Bar/Bar'
import { useHideOnScroll } from '../../helpers/useHideOnScroll'
import { classNames } from '../../helpers/className'
import TransactionCard from '../../components/Content/TransactionCard'
import DownloadFileIcon from '../../components/icons/DownloadFileIcon'
import TransactionsSidebar from './TransactionsSidebar'
import Dropbox from '../../components/Content/Dropbox'
import { getTransactions } from '../../services/transactions/transactions'
import { useAppContext } from '../../context/AppContext'
import { type TransactionItem } from '../../types/Transactions'
import NoTransactionPage from './NoTransactionPage'

const fullMonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default function TransactionsPage () {
  const shouldHide = useHideOnScroll()
  const { user } = useAppContext()
  const [transactions, setTransactions] = useState<
  Record<string, TransactionItem[]>
  >({})
  const [rawArrayTrx, setRawArrayTrx] = useState<TransactionItem[]>([])
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const download = (e: MouseEvent) => {
    e.stopPropagation()
    console.log('click')
  }

  const sortTransactionsByYearAndMonth = (transactions: TransactionItem[]) => {
    const sortedTransactions: Record<string, TransactionItem[]> = {}
    transactions.forEach((transaction) => {
      const date = transaction.date
      const year = date.getFullYear()
      const month = date.getMonth()
      const key = `${fullMonthNames[month]}-${year}`
      if (sortedTransactions[key]) {
        sortedTransactions[key].push(transaction)
      } else {
        sortedTransactions[key] = [transaction]
      }
    })
    return sortedTransactions
  }

  const getUserTransactions = useCallback(async () => {
    if (user) {
      const transactions = await getTransactions()
      const transactionsArray: TransactionItem[] = Object.values(
        transactions
      ).map((item: any) => ({
        hash: item.id,
        amount: item.amount,
        date: new Date(item.created),
        status: item.tradeComplete ? 'completed' : 'pending'
      }))
      setRawArrayTrx(transactionsArray)
      const sortedTransactions =
        sortTransactionsByYearAndMonth(transactionsArray)
      setTransactions(sortedTransactions)
    }
  }, [user])

  const ranged = useMemo(() => rawArrayTrx.filter(item => {
    const itemDate = new Date(item.date)
    const start = new Date(startDate ?? 0)
    const end = new Date(endDate ?? Date.now())

    return itemDate >= start && itemDate <= end
  }), [endDate, startDate, rawArrayTrx])

  useEffect(() => {
    void getUserTransactions()
  }, [user])

  useEffect(() => {
    setTransactions(sortTransactionsByYearAndMonth(ranged))
  }, [ranged])

  return (
    <>
      <Bar>
        <div className="flex justify-between items-center h-full px-6">
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium uppercase'>
            Transactions
          </h1>
        </div>
      </Bar>
      {Object.keys(transactions).length
        ? <NoTransactionPage />
        : (
      <div className="flex text-white pt-5">
        <div className={classNames('w-full lg:max-w-[256px] fixed lg:sticky z-30 bg-darkSecondary lg:bg-transparent flex justify-center duration-100',
          isSidebarOpen ? 'left-0' : ' -left-full'
        )}>
          <div
            className={classNames(
              'flex flex-col flex-grow max-w-[326px] lg:max-w-[256px] px-6 sm:px-0  max-h-screen sticky overflow-auto bottom-0',
              shouldHide
                ? 'h-[calc(100vh-60px)] top-[60px]'
                : 'h-[calc(100vh-120px)] top-[120px]'
            )}
          >
            <div className={classNames('flex py-6 lg:hidden items-center gap-2',
              isSidebarOpen ? 'text-white' : 'text-graySecondary'
            )}
            onClick={() => { setIsSidebarOpen(prev => !prev) }}>
              <span className='font-["Barlow"] text-[17px]'>FILTERS</span>
              <svg className={classNames(isSidebarOpen ? '' : 'rotate-180')} width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.30811 7.3706L4.52686 7.1792C4.63623 7.04248 4.63623 6.85107 4.52686 6.71435L2.22998 4.44482L12.4839 4.44482C12.6753 4.44482 12.812 4.28076 12.812 4.1167L12.812 3.84326C12.812 3.65186 12.6753 3.51514 12.4839 3.51514L2.22998 3.51514L4.52686 1.21826C4.63623 1.08154 4.63623 0.890136 4.52686 0.753417L4.30811 0.562011C4.19873 0.425292 3.97998 0.425292 3.84326 0.562011L0.671387 3.73389C0.534668 3.8706 0.534668 4.06201 0.671387 4.19873L3.84326 7.3706C3.97998 7.50732 4.19873 7.50732 4.30811 7.3706Z" fill="currentColor"/>
              </svg>
            </div>
            <TransactionsSidebar
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            endDate={endDate}
            startDate={startDate}
            />
          </div>
        </div>
        <div className="w-full flex flex-col px-6 lg:px-0 pt-6">
          <div className={classNames('flex lg:hidden items-center mb-6 gap-2',
            isSidebarOpen ? 'text-white' : 'text-graySecondary'
          )}
            onClick={() => { setIsSidebarOpen(prev => !prev) }}
          >
            <span className='font-["Barlow"] text-[17px]'>FILTERS</span>
            <svg className={classNames(isSidebarOpen ? '' : 'rotate-180')} width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.30811 7.3706L4.52686 7.1792C4.63623 7.04248 4.63623 6.85107 4.52686 6.71435L2.22998 4.44482L12.4839 4.44482C12.6753 4.44482 12.812 4.28076 12.812 4.1167L12.812 3.84326C12.812 3.65186 12.6753 3.51514 12.4839 3.51514L2.22998 3.51514L4.52686 1.21826C4.63623 1.08154 4.63623 0.890136 4.52686 0.753417L4.30811 0.562011C4.19873 0.425292 3.97998 0.425292 3.84326 0.562011L0.671387 3.73389C0.534668 3.8706 0.534668 4.06201 0.671387 4.19873L3.84326 7.3706C3.97998 7.50732 4.19873 7.50732 4.30811 7.3706Z" fill="currentColor"/>
            </svg>
          </div>
          {Object.keys(transactions).map((yearAndMonth) => (
            <div key={yearAndMonth} className=" w-full max-w-[672px] mx-auto ">
              <Dropbox
                label={yearAndMonth}
                renderSubHeader={
                  <div
                    className="flex items-center gap-2 text-graySecondary ml-2 hover button"
                    onClick={download}
                  >
                    <DownloadFileIcon />
                    <span className="text-sm tracking-[1.12px] uppercase">
                      invoice
                    </span>
                  </div>
                }
              >
                <div className="flex flex-col gap-3 mt-4">
                  {transactions[yearAndMonth].map((trx, id) => (
                    <TransactionCard key={id} {...trx} />
                  ))}
                </div>
              </Dropbox>
              <div className=" border border-b border-darkGrey my-8" />
            </div>
          ))}
        </div>
      </div>)}
    </>
  )
}
