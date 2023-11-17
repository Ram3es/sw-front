import { IGiftCardRedeemRes } from "@/types/Wallet";
import { POST } from "../axios.instance";

export const buyGiftCard = async (params: { code: string }) => await POST<IGiftCardRedeemRes, typeof params>('/wallet/redeem-giftcard', params)