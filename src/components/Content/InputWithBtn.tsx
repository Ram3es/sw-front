
import { useState } from 'react'
import { Button } from '../Navigation'

interface IInputWithBtnProps {
  submitFn: (inputValue: string) => void
  placeholder: string

}

const InputWithBtn = ({ placeholder, submitFn }: IInputWithBtnProps) => {
  const [inputValue, setInputValue] = useState('')
  return (
    <div className='relative mt-0  mx-4 my-5'>
    <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value) }}
        className='w-full h-8 sm:h-11 pl-4 pr-24 bg-darkGrey outline-none'
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
