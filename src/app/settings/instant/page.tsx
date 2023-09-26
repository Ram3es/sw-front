'use client'
import WalletCard, { IWalletCard } from "@/components/Content/WalletCard";
import { WALLETS } from "@/constants/settings";
import { useSettingsContext } from "@/context/SettingsContext";
import { useEffect, useState } from "react";

export default function Instant() {
  const { data } = useSettingsContext()
  const [walletItems, setWalletItems] = useState<IWalletCard[]>([])

  const handleInputChange = (newValue: string, index: number) => {
    setWalletItems((prev) => {
      const newValues = [...prev];
      console.log(newValues,  newValues[index]);
      
      newValues[index]['placeholder'] = newValue
      return newValues
    });
  };

  useEffect(() => {
    setWalletItems(() => WALLETS.map((w: any, index: number) => ({ 
      currency: w.currency,
      title: w.title,
      placeholder: w.text,
      varificationRequired: w.varificationRequired,
      isVerified: w.isVerified,
      verifyFn: w.verifyFn,
      onValueUpdate: (v: string) => handleInputChange(v, index)
    })))
  }, [])

  useEffect(() => {
    data && data.cryptoWallets.map((wallet) =>{
       setWalletItems(prev => [...prev.map(method => {
        if(method.currency === wallet.currency){
          return {...method, placeholder: wallet.wallet, id: wallet?.id  }
        }
        return method
       })])
    } )
  }, [data])

    return (
        <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] items-end flex flex-col gap-8 mx-auto '>
            <div className="flex flex-col w-full gap-4 text-graySecondary">
             {walletItems.map((wallet) => 
                <WalletCard
                  key={wallet.currency}
                  {...wallet}
                 /> 
                )}
            </div>
           
          </div>
        </div>
    )
  }