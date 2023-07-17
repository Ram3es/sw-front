export interface TransactionItem {
  hash: string
  amount: number
  date: Date
  status: 'completed' | 'pending'
  paypalId?: string
}
