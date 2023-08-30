import Image from 'next/image'

const GiftContent = () => {
  return (
        <div className='flex flex-col gap-4 mt-5'>
          <div className='flex flex-col gap-2 marked-list text-white'>
            <p>No initial verification</p>
            <p>Top-up limit not applicable</p>
            <p>Fast and easy to use</p>
            <p>0% fee</p>
          </div>
          <div className='flex flex-col' >
            <span className='text-xs leading-3 font-normal text-graySecondary'>Buy Gift Cards from our partner</span>
            <Image
              src="/img/funds/kinguin.png"
              alt="kinguin"
              width={128}
              height={43}
              className='w-32 h-auto -translate-x-3 pt-1 pb-2'
            />
          </div>

        </div>
  )
}

export default GiftContent
