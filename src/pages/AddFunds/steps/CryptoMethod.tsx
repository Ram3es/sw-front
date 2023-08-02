import React, { useState } from 'react'
import { ReactComponent as Crypto } from '../../../assets/img/funds/crypto.svg'
import { ReactComponent as Bitcoin } from '../../../assets/img/funds/rounded-bitcoin.svg'
import { ReactComponent as Ethereum } from '../../../assets/img/funds/rounded-ethereum.svg'
import { ReactComponent as Litecoin } from '../../../assets/img/funds/rounded-litecoin.svg'
import CardWrapper from '../../../container/CardWrapper'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'

const cryptoMethods = [
  {
    method: 'bitcoin',
    logo: <Bitcoin/>
  },
  {
    method: 'ethereum',
    logo: <Ethereum/>
  },
  {
    method: 'litecoin',
    logo: <Litecoin/>
  }
]

const CryptoMethod = () => {
  const [selectedCryptoMethod, setSelectedCryptoMethod] = useState<string>()
  return (
        <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>step 2/4</h3>
              <h2 className='uppercase tracking-[1.28px] text-white '>SELECT CRYPTOCURRENCY</h2>
            </div>
            <Crypto />
          </div>
          <div className='flex flex-col sm:flex-row gap-3'>
            {cryptoMethods.map(way =>
              <CardWrapper
                key={way.method}
                isSelected={selectedCryptoMethod === way.method}
                onSelect={() => { setSelectedCryptoMethod(way.method) }}
                additionalClass='p-6 min-h-[80px]'
              >
                <div className='flex items-center gap-5'>
                    {way.logo}
                    <span className='text-white capitalize'>{way.method}</span>
                </div>

              </CardWrapper>)}
          </div>
          <Button
              text='Next'
            //   onClick={setStep}
              className={classNames('bg-skinwalletPink justify-center items-center w-[100px] h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                selectedCryptoMethod ? '' : 'pointer-events-none grayscale opacity-50')}
             />
        </div>
  )
}

export default CryptoMethod
