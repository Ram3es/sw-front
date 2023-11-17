export interface ISelectMethodProps {
    methods?: Method[]
}
  
export interface Method {
    name: string;
    enabled: boolean;
    allowedTypes: string[];
    feePercentage: number;
    fee: number;
    max: number;
    min: number;
}

export interface IGiftCardRedeemRes {
    value: number,
    code: string,
    used: boolean,
    externalUserId: string
}