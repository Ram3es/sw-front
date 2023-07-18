export interface ITransactions {
  hash: string
  amount: number
  date: string
  status: string
  paypalId: string
}

export const TRANSACTIONS: ITransactions[] = [
  {
    hash: 'e07e4782-7d8f-4064-b1eww-24b124389a20',
    amount: 109.99,
    date: '12.28.2020, 12:10',
    status: 'completed',
    paypalId: 'mailto:example@gmail.com'
  },
  {
    hash: 'e07e4q782-7d8f-4554-b1ed-24b124389a20',
    amount: 69.49,
    date: '12.28.2020, 12:10',
    status: 'pending',
    paypalId: 'mailto:example@gmail.com'
  },
  {
    hash: 'e07e478q2-6d8f-4064-b1ed-24b124389a20',
    amount: 69.49,
    date: '12.28.2020, 12:10',
    status: 'pending',
    paypalId: 'mailto:example@gmail.com'
  },
  {
    hash: 'e07e4782-8d8f-4064-be1ed-24b124389a20',
    amount: 69.49,
    date: '12.28.2020, 12:10',
    status: 'completed',
    paypalId: 'mailto:example@gmail.com'
  },
  {
    hash: 'e07e4782-8d8f-40w64-b1ed-24b12438e9a20',
    amount: 69.49,
    date: '08.15.2021, 12:10',
    status: 'completed',
    paypalId: 'mailto:example@gmail.com'
  },
  {
    hash: 'e07qe4782-8d8f-4064-b1ed-24b12w4389a20',
    amount: 69.49,
    date: '08.15.2021, 12:10',
    status: 'completed',
    paypalId: 'mailto:example@gmail.com'
  }

]
