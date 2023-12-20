import { PayMethod } from '@/types/Wallet'
import { type IPayoutResponse } from '../../types/Payout'
import { GET, POST } from '../axios.instance'

export const getPaymentsMethods = async () =>
  await GET<PayMethod[]>('/payments/payment-methods')

export const getPayoutDailyLimits = async () =>
  await GET<any>('/payments/limits')
