import { GET } from "../axios.instance";

export const checkTradeAbility = async () => await GET<any>('/steam/tradehold')
