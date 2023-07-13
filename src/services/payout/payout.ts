import { POST } from '../axios.instance'

export const payout = async (data: { amount: number }) =>
  await POST<any, { amount: number }>('/payments/payout', data)
