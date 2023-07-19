import { type IPayoutResponse } from '../../types/Payout'
import { GET, POST } from '../axios.instance'

export const payout = async (data: { amount: number }) =>
  await POST<IPayoutResponse, { amount: number }>('/payments/payout', data)

export const getPayoutMethods = async () =>
  await GET<any>('/payments/payment-methods')

export const getPayoutDailyLimits = async () =>
  await GET<any>('/payments/limits')
