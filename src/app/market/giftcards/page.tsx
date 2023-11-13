"use client"
import Bar from "@/components/Bar/Bar"
import { Button } from "@/components/Navigation/Button"
import { classNames } from "@/helpers/className"
import { buyGiftCard } from "@/services/wallet/wallet"
import { IGiftCardRedeemRes } from "@/types/GiftCard"
import Link from "next/link"
import { useState } from 'react'

export default function RedeemGiftCard() {
  const [code, setCode] = useState('')
  const isButtonDisabled = () => !code.length
  const [giftCard, setGiftCard] = useState<IGiftCardRedeemRes>()
  const [responseStatus, setResponseStatus] = useState('')

  const redeemGiftcard = async () => {
    try {
      const data = await buyGiftCard({ code })
      setGiftCard(data)
      if (data?.value) setResponseStatus('success')
    } catch (error) {
      console.log('redeemGiftcard', error)
      setResponseStatus('failed')
    }
  }

  const getRedeemCardStatus = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <>
              <div className=' w-full flex flex-col md:flex-row items-center justify-center pb-8'>
                <div className='flex flex-col items-center text-center text-24 uppercase tracking-[1.2px] text-white'>
                  <h2>the transaction is successful</h2>
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                <Link href="/market">
                  <Button
                    className='bg-skinwalletPink w-max uppercase text-dark-14 hover:opacity-50 cta-clip-path'
                    heightClass='h-12'
                    text='home page'
                  />
                </Link>
              </div>
          </> 
        )
      case 'failed':
        return (
          <>
              <div className=' w-full flex flex-col md:flex-row items-center justify-center pb-8'>
                <div className='flex flex-col items-center text-center text-24 uppercase tracking-[1.2px] text-white'>
                  <h2>Oops! something went wrong...</h2>
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                <Button
                  className='bg-skinwalletPink w-max uppercase text-dark-14 hover:opacity-50 cta-clip-path'
                  heightClass='h-12'
                  text='try one more time'
                  onClick={() => setResponseStatus('')}
                />
              </div>
          </> 
        )
      case 'already_redeemed':
        return (
          <>
              <div className=' w-full flex flex-col md:flex-row items-center justify-center pb-8'>
                <div className='flex flex-col items-center text-center text-24 uppercase tracking-[1.2px] text-white'>
                  <h2>giftcard already redeemed</h2>
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                <Button
                  className='bg-skinwalletPink w-max uppercase text-dark-14 hover:opacity-50 cta-clip-path'
                  heightClass='h-12'
                  text='try one more time'
                  onClick={() => setResponseStatus('')}
                />
              </div>
          </> 
        )
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
          { !responseStatus ? 
            ( <div>        
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
                    className=' bg-black bg-opacity-50 border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary text-23 small-caps leading-[24px] tracking-[2.3px] [&_.text]:mb-1'
                    heightClass='h-12'
                  />
                  <Button
                    text='redeem'
                    disabled={isButtonDisabled()}
                    onClick={redeemGiftcard}
                    className={classNames('bg-skinwalletPink justify-center items-center w-max h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200 cta-clip-path',
                    isButtonDisabled() ? 'opacity-50' : '')}
                  />
                </div> 
              </div>
            ) : (
              <div className='w-full flex flex-col items-center max-w-[1850px] pt-16 px-16'>
                <div className='w-full flex flex-col max-w-[1160px]'>
                  <div className='w-full h-full flex flex-col '>
                    {getRedeemCardStatus(responseStatus)} 
                  </div>
                </div>
              </div>
            )
            
          }
        </div>
      </div>
    </>

  )
}