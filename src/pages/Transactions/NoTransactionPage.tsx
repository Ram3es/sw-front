import { Button } from '../../components/Navigation'

const NoTransactionPage = () => {
  return (
        <div className='w-full flex-grow flex items-center justify-center text-white'>
            <div className='flex flex-col px-6 text-center'>
                <h1 className='mb-6 text-2xl  uppercase tracking-[1.92px]'>no transactions to show</h1>
                <span className="mb-10 text-graySecondary font-normal">Lorem ipsum dolorem sit amet.</span>
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-5">
                    <Button
                      text="browse skin"
                      className='w-[158px] bg-skinwalletPink text-darkSecondary text-lg uppercase justify-center hover:opacity-50 small-caps cta-clip-path '
                      heightClass='h-10'
                    />
                     <Button
                      text="sell skins"
                      className='w-[158px] bg-swLime text-darkSecondary text-lg uppercase justify-center hover:opacity-50 small-caps cta-tr-corner'
                      heightClass='h-10'
                    />
                </div>
            </div>
        </div>
  )
}

export default NoTransactionPage
