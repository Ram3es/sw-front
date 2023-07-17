import { useEffect, type MouseEvent, useCallback, useState } from 'react'
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
      const sortedTransactions =
        sortTransactionsByYearAndMonth(transactionsArray)
      setTransactions(sortedTransactions)
    }
  }, [user])

  useEffect(() => {
    void getUserTransactions()
  }, [user])

  return (
    <>
      <Bar>
        <div className="flex justify-between items-center h-full px-6">
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium uppercase'>
            Transactions
          </h1>
        </div>
      </Bar>

      <div className="flex text-white pt-5">
        <div
          className={classNames(
            'flex flex-col flex-grow max-w-[256px] max-h-screen sticky overflow-auto bottom-0',
            shouldHide
              ? 'h-[calc(100vh-60px)] top-[60px]'
              : 'h-[calc(100vh-120px)] top-[120px]'
          )}
        >
          <TransactionsSidebar />
        </div>
        <div className="w-full flex flex-col pt-6">
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
      </div>
    </>
  )
}
