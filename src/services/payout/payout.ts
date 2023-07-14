import { GET, POST } from '../axios.instance'

export const payout = async (data: { amount: number }) =>
  await POST<any, { amount: number }>('/payments/payout', data)

export const getPayoutMethods = async () =>
  await GET<any>('/payments/payment-methods')
