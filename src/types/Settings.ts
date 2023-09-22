export interface IUserBillingAddress {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    streetAddress: string;
    streetAddress2?: string | null;
    city: string;
    province?: string | null;
    zip: string;
    country: string;
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