
import { InputHTMLAttributes, useState } from 'react'
import { Button } from '../Navigation'

interface IInputWithBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  submitFn: (inputValue: string) => void
  placeholder: string
  walletAddress?: string

}

const InputWithBtn = ({ placeholder,walletAddress, submitFn, ...rest }: IInputWithBtnProps) => {
  const [inputValue, setInputValue] = useState(walletAddress ?? '')
  return (
    <div className='relative mt-0  mx-4 my-5'>
    <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value) }}
        className='w-full h-8 sm:h-11 pl-2 sm:pl-4 pr-[84px] sm:pr-[116px] bg-darkGrey outline-none'
        {...rest}
    />
    <Button
        text='set'
        onClick={() => { submitFn(inputValue) }}
        className='absolute top-0 right-0 h-full  w-20 sm:w-28 justify-center text-darkSecondary  cta-clip-path uppercase text-sm sm:text-base text-swBlack bg-swLime hover cursor-pointer '
    />
</div>
  )
}

export default InputWithBtn
