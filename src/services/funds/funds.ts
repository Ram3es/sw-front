import { POST } from '../axios.instance'

export const sendCouponCode = async (data: { coupon: string }) => await POST('payments/couponValidation', data)
