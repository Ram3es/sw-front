import { Button } from "@/components/Navigation"
import { usePayoutContext } from "@/context/PayoutContext"
import { redirect } from "next/navigation"
import { format } from '@/helpers/numberFormater'

const SummaryPayout = () => {
  const {
    amount,
    methodsState,
    availableMethods,
    setPayoutStep,
    setAmount
  } = usePayoutContext()


  const handleViewMore = () => {
    setPayoutStep('amount')
    setAmount(0)
    redirect('/deposit')
  }

  const getFee = (): number => {
    const currentMethod = Object.keys(methodsState).filter(key => methodsState[key].isSelected).join()
    console.log(availableMethods, currentMethod);
    
    // const fixedFee = availableMethods[currentMethod].fixedFee
    return Number(((amount / 100) * 0).toFixed(2))
  }

  return (
        <div className=' flex flex-col items-center mx-auto gap-6 text-center max-w-[432px] text-white '>
            <div className=' uppercase tracking-[1.12px]'>
                <h6 className='text-graySecondary mb-2'>summary</h6>
                <p className=' text-2xl leading-[24px]  max-w-[294px] '>
                    Your payout is being processed by paypal.
                </p>
            </div>
            <p className=' text-graySecondary left-5'>
                As soon as PayPal finishes processing your payout, we will send you an email with the final status of this operation.
            </p>
            <div className=''>
                <h5 className='text-sm uppercase  tracking-[1.12px]'>total payout value</h5>
                <span className='text-swLime text-2xl'>${format(amount)}</span>
            </div>
            <div className=''>
                <h5 className='text-sm uppercase  tracking-[1.12px]'>fee value</h5>
                <span className='text-yellow-1e text-2xl'>${getFee()}</span>
            </div>
            <div className=' w-full flex flex-col sm:flex-row gap-3  mt-4'>
                <Button
                    text='view transaction'
                    onClick={() => { redirect('/panel/transactions') }}
                    className='w-full sm:w-1/2 bg-swLime hover justify-center text-darkSecondary cta-clip-path uppercase '
                    heightClass='h-10'
                />
                <div className=' w-full sm:w-1/2 relative overflow-hidden hover button'>
                    <Button
                        text='sell more items '
                        className=' w-full  border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary '
                        onClick={handleViewMore}
                        heightClass='h-10'
                    />
                        <div className='absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45' />
                </div>
            </div>

        </div>
  )
}

export default SummaryPayout
