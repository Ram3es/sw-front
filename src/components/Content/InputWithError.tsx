import { type FC, type InputHTMLAttributes, useRef, useState } from 'react'
import { classNames } from '../../helpers/className'
import ExclamationTriangleIcon from '../icons/ExclamationTriangle'
import Mark from '../icons/wallet/Mark'
import CloseIcon from '../icons/CloseIcon'

interface IInputWithErrors extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (value: string) => void
  onClear: () => void
  handleBlur: () => void
  isLoading?: boolean
  errorBorder: string
  error?: any
  variant?: string
  label?: string
}

const InputWithErrors: FC<IInputWithErrors> = ({ value, label, isLoading, error, errorBorder, variant = 'amount', onClear, handleChange, handleBlur, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (inputRef?.current) {
      inputRef.current.focus()
      onClear()
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (inputRef?.current) {
      inputRef.current.focus()
      setIsFocused(true)
    }
  }
  const onBlur = () => {
    setIsFocused(false)
    handleBlur()
  }
  return (
      <div className='group'>
        <div
          onMouseDown={handleClick}
          onBlur={onBlur}
          className={classNames('w-full flex items-center h-14 border-2 border-darkGrey group  px-6 cursor-text relative',
            error?.status && !isFocused ? errorBorder : 'focus-within:border-white')}
        >
          <div className='w-full flex flex-col'>
            <label className='w-full text-graySecondary text-11 leading-[11px] capitalize pointer-events-none'>{label ?? 'amount'}</label>
            <div className='w-full flex items-center text-lg leading-[18px]'>
            {variant === 'amount' && <span>$</span>}
              <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => { handleChange(e.target.value) }}
                className='w-0 grow bg-transparent outline-none pr-4'
                {...rest}
              />
            </div>
          </div>
          <div>
            <div onMouseDown={handleClear} className='hidden group-focus-within:block cursor-pointer text-graySecondary hover:text-white duration-200'>
              <CloseIcon className='w-3 h-[18px] ' />
            </div>
            { !error?.status && !isLoading && value !== '' && <Mark className='block group-focus-within:hidden text-swLime w-4 h-[18px]' />}
          </div>
          {variant === 'coupon' && !isFocused && value === '' &&
            <div className='absolute inset-0 bg-darkSecondary '>
              <div className='w-full h-full flex px-6 items-center text-lg '>Coupon Code</div>
            </div> }
        </div>
        {error?.status && !isFocused &&
            <div className={classNames('py-1 px-3 group-focus-within:hidden',
              error?.errorClass ?? 'text-white')}
            >
              <ExclamationTriangleIcon className='shrink-0' />
              {error?.message}
            </div> }
      </div>
  )
}

export default InputWithErrors
