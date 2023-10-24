import { EToastType } from "./Enums";

export interface IUserBillingAddress {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    streetAddress: string;
    streetAddress2?: string
    city: string;
    province?: string 
    zip: string;
    country: string;
    birthDate: string 
  }

  export interface IUserCryptoWallet {
    id: number;
    userId: number;
    wallet: string;
    currency: string;
  }
  export interface IUserAccount {
    id: number;
    userId: number;
    accountType: string;
    accountNumber: string;
  }

  export type IUpdateSettingDto = Record<string, string | number | boolean>

  export interface IToast  {
    id: string
    type: keyof typeof EToastType,
    message: string
  }