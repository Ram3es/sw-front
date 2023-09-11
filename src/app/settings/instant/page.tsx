'use client'
import WalletCard, { IWalletCard } from "@/components/Content/WalletCard";
import { Button } from "@/components/Navigation";
import EditPencil from "@/components/icons/EditPencil";
import InformationIcon from "@/components/icons/InformationIcon";
import { WALLETS } from "@/constants/settings";
import { useEffect, useState } from "react";

export default function Instant() {
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
      title: w.title,
      placeholder: w.text,
      varificationRequired: w.varificationRequired,
      isVerified: w.isVerified,
      verifyFn: w.verifyFn,
      onValueUpdate: (v: string) => handleInputChange(v, index)
    })))
  }, [])

    return (
        <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] items-end flex flex-col gap-8 mx-auto '>
            <div className="flex flex-col w-full gap-4 text-graySecondary">
             {walletItems.map((wallet) => 
                <WalletCard
                  key={wallet.title}
                  {...wallet}
                 /> 
                )}
            </div>
            <Button
              text="Save"
              onClick={() => {
                console.log('Save')
              }}
              className=" w-24 flex justify-center text-base font-medium text-darkGrey bg-skinwalletPink/50 hover:bg-skinwalletPink/80 uppercase cursor-pointer cta-clip-path "
            />
          </div>
        </div>
    )
  }