import { PayMethod } from "./Wallet"

export interface IPayoutResponse {
  daily_limit: number
  new_balance: number
  operation: string
  prev_balance: number

}

 export interface TMethodState  extends PayMethod {
  id?: number
  isSelected: boolean
  isEditMode: boolean
  method?: string 
  walletAddress?: string

 }

