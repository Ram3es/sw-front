import { EPaymentMethod, ICreatePayinRes, IGiftCardRedeemRes, IPayoutDataReq, IUserWallet } from "@/types/Wallet";
import { GET, POST } from "../axios.instance";
import { IPayoutResponse } from "@/types/Payout";

export const buyGiftCard = async (params: { code: string }) => await POST<IGiftCardRedeemRes, typeof params>('/wallet/redeem-giftcard', params)

export const createPayin = async (params: { method: EPaymentMethod, amount: number, balanceAmount: number  }) => 
  await POST<ICreatePayinRes, typeof params>('/wallet/payin', params)

export const getAllWallets = async () => await GET<IUserWallet[]>('/wallet')

export const createPayout = async (data: IPayoutDataReq) =>
  await POST<IPayoutResponse, IPayoutDataReq>('/wallet/payout', data)
