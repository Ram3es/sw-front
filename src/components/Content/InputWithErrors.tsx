'use client'
import { type FC, type InputHTMLAttributes, useRef, useState, ChangeEvent,  } from 'react'
import { classNames } from '../../helpers/className'
import ExclamationTriangleIcon from '../icons/ExclamationTriangle'
import CloseIcon from '../icons/CloseIcon'

interface IInputWithErrors extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (value: string, e?: ChangeEvent<HTMLInputElement> ) => void
  onClear?: () => void
  handleBlur?: () => void
  label?: string
  variant?: string
  isLoading?: boolean
  error?: any
  errorIcon?: JSX.Element
  errorBorder: string
  successIcon?: JSX.Element
  withClearBtn?: boolean
  activeClass?: string
  wrapperClasses?: string
}

const InputWithErrors: FC<IInputWithErrors> = ({ 
  value,
  label,
  isLoading,
  error,
  errorBorder,
  variant,
  errorIcon,
  successIcon,
  withClearBtn,
  activeClass,
  wrapperClasses,
  onClear,
  handleChange,
  handleBlur,
   ...rest }) => {

  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (inputRef?.current) {
      inputRef.current.focus()
      onClear?.()
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
    handleBlur?.()
    setIsFocused(false)
    
  }
  return (
      <div className='group'>
        <div
          onMouseDown={handleClick}
          onBlur={onBlur}
          className={classNames('w-full flex items-center h-14  group  px-6 cursor-text relative',
            wrapperClasses ?? 'border-2 border-darkGrey',
            isFocused ? activeClass ?? 'focus-within:border-white' : '',
            error?.status && !isFocused ? errorBorder : '')}
        >
          <div className='w-full flex flex-col'>
            <label className={classNames('w-full text-graySecondary text-11 leading-[11px] capitalize pointer-events-none ',
             value === '' && !isFocused ? 'hidden' : 'block' )}>
              {label}
            </label>
            <div className='w-full flex items-center text-lg leading-[18px]'>
              {variant === 'amount' && <span>$</span>}
              <input
                ref={inputRef}
                type='text'
                value={value}
                onChange={(e) => { handleChange(e.target.value, e) }}
                className='w-0 grow bg-transparent outline-none pr-4'
                {...rest}
              />
            </div>
          </div>
          <div>
            {withClearBtn && (
              <div onMouseDown={handleClear} >
                <CloseIcon className='hidden group-focus-within:block w-3 h-[18px] cursor-pointer text-graySecondary hover:text-white duration-200' />
              </div>
            )}
            <div className='group-focus-within:hidden'>
              {successIcon && !error?.status && !isLoading && value !== '' && successIcon }
              {errorIcon && error?.status  && !isLoading && errorIcon }
            </div>
          </div>
          {variant === 'coupon' && !isFocused && value === '' &&
            <div className='absolute inset-0 bg-transparent '>
              <div className='w-full h-full flex px-6 items-center text-lg capitalize '>{label}</div>
            </div> }
        </div>
        {error?.status && !isFocused &&
          <div className={classNames('flex items items-center gap-2 py-1 px-3 group-focus-within:hidden capitalize',
            error?.errorClass ?? 'text-white')}
          >
            {error?.msgWithIcon &&  <ExclamationTriangleIcon className='shrink-0' />}
            {error?.message}
          </div> }
      </div>
  )
}

export default InputWithErrors
