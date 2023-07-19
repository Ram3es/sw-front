export interface IPayoutResponse {
  daily_limit: number
  new_balance: number
  operation: string
  prev_balance: number

}

export type TMethodState = Record<string, { isSelected: boolean, methodAccount: string }>
