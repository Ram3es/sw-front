export interface TransactionItem {
  hash: string
  amount: number
  date: Date
  status: string
  paypalId?: string
}

export interface ITransactionRes {
    id: number
    userId: number
    transactionId: string
    type: ETransactionType
    amountTransaction: number
    amountBalance: number
    status: ETransactionStatus
    method: string
    createdAt: string
    updatedAt: string
}

export enum ETransactionType {
  Payin = 'payin',
  Payout = 'payout'
}

export enum ETransactionStatus {
  pending = 'pending',
  processing= 'processing',
  sent = 'sent',
  complete = 'complete',
  failed = 'failed',
  denied = 'denied',
  refunded = 'refunded',
  expired = 'expired'
}
