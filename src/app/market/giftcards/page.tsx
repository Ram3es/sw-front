"use client"
import Bar from "@/components/Bar/Bar"
import { Button } from "@/components/Navigation/Button"
import Readme from "@/components/funds/readme/Readme"
import { useAppContext } from "@/context/AppContext"
import { classNames } from "@/helpers/className"
import { buyGiftCard } from "@/services/wallet/wallet"
import { IGiftCardRedeemRes } from "@/types/Wallet"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from 'react'

export default function RedeemGiftCard() {
  const [code, setCode] = useState('')
  const isButtonDisabled = () => !code.length
  const [giftCard, setGiftCard] = useState<IGiftCardRedeemRes>()
  const [responseStatus, setResponseStatus] = useState('')

  const { showToast } = useAppContext()
  const { push } = useRouter()

  const redeemGiftcard = async () => {
    try {
      const data = await buyGiftCard({ code })
      setGiftCard(data)
      if (data?.value) setResponseStatus('success')
    } catch (error) {
  if(axios.isAxiosError(error)){
    showToast(error?.response?.data?.message)
  }
    }
  }

  return (
    <>
    <Bar>
      <div className="flex justify-between items-center h-full px-6">
        <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
          redeem gift card
        </h1>
      </div>
    </Bar>
      <div className="text-graySecondary w-full mt-[68px] mb-40">
        <div className=" max-w-[640px] mx-auto px-6 flex flex-col gap-[120px] ">
        <Readme>
          <div className="flex flex-col gap-8">
            <p>Gift cards are used to top up your wallet with a specified amount. </p>
            <p>Keep in mind that funds redeemed through gift cards are not withdrawable and can only be used for market purchases.</p>
            <Link href='/market/terms-of-service' className="underline hover:no-underline">Read more about the SW Market Wallet in Terms of Service.</Link>
          </div>
        </Readme>
          <div>        
              <div className="bg-transparent border border-graySecondary mb-6">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value) }}
                  type="text"
                  placeholder="Gift card code"
                  className="w-full p-3 bg-transparent border-none outline-none text-graySecondary font-Barlow"
                />
              </div>
              <div className='flex justify-end gap-3 text-21'>
                <Button
                  text='cancel'
                  onClick={() => push('/wallet')}
                  className='relative bg-black bg-opacity-50 border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary text-23 small-caps leading-[24px] tracking-[2.3px] [&_.text]:mb-1'
                  heightClass='h-12'
                >
                  <div className=' w-4 absolute -left-[5px] bottom-1  border-b border-graySecondary rotate-45' />
                </Button>
                <Button
                  text='redeem'
                  disabled={isButtonDisabled()}
                  onClick={redeemGiftcard}
                  className={classNames('bg-skinwalletPink justify-center items-center w-max h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200 cta-clip-path',
                  isButtonDisabled() ? 'opacity-50' : '')}
                />
              </div> 
            </div>
        </div>
      </div>
    </>

  )
}