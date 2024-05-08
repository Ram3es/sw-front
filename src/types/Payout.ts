import { PayMethod } from "./Wallet"

export interface IPayoutResponse {
  id: string
  method: string
  amount: number
  address: string
  externalUserId: string
  status: string
  balance: number
}

 export interface TMethodState  extends PayMethod {
  id?: number
  isSelected: boolean
  isEditMode: boolean
  method?: string 
  walletAddress?: string

 }

