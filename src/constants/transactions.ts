import { ETransactionType } from "@/types/Transactions"

export const TRNS_STRING = {
  ps_done: 'Your payout is has been processed and the payout has been made.',
  ps_pending: `Your payout is now being processed which
    will take up to 24 hours. Once it’s completed,
    you will receive an email with the status of
    your transaction. Thank you for your patience.`
}

export const TRX_CARD_CONTENT: Record<ETransactionType , ICardContent> = {
  payin: {
    title: 'Deposit',
    status: 'Deposited'
  },
  payout: {
    title: 'Cashout',
    status: 'Withdrawn'
  }
}
export interface ICardContent {
  title:string
  status: string
}


