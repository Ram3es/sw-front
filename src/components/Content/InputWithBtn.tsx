
import { useState } from 'react'
import { Button } from '../Navigation'

interface IInputWithBtnProps {
  submitFn: (inputValue: string) => void
  placeholder: string

}

const InputWithBtn = ({ placeholder, submitFn }: IInputWithBtnProps) => {
  const [inputValue, setInputValue] = useState('')
  return (
    <div className='relative  m-4'>
    <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value) }}
        className='w-full h-11 pl-4 pr-24 bg-darkGrey outline-none'
    />
    <Button
        text='set'
        onClick={() => { submitFn(inputValue) }}
        className='absolute top-0 right-0 h-full px-[32px] text-darkSecondary  cta-clip-path uppercase text-base text-swBlack bg-swLime hover cursor-pointer '
    />
</div>
  )
}

export default InputWithBtn
