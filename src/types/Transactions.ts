export interface TransactionItem {
  hash: string
  amount: number
  date: Date
  status: 'completed' | 'pending'
  paypalId?: string
}

export enum TransactionStatus {
  pending = 'pending',
  processing= 'processing',
  sent = 'sent',
  complete = 'complete',
  failed = 'failed',
  denied = 'denied',
  refunded = 'refunded',
  expired = 'expired'
}
