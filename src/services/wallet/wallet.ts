import { EPaymentMethod, ICreatePayinRes, IGiftCardRedeemRes } from "@/types/Wallet";
import { POST } from "../axios.instance";

export const buyGiftCard = async (params: { code: string }) => await POST<IGiftCardRedeemRes, typeof params>('/wallet/redeem-giftcard', params)

export const createPayin = async (params: { method: EPaymentMethod, amount: number }) => await POST<ICreatePayinRes, typeof params>('/wallet/payin', params)
