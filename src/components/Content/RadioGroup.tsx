import { type ReactNode } from 'react'
import { classNames } from '../../helpers/className'
import { IOfferFilter } from '@/constants/market-offers'


const RadioGroup = (
  { 
    options,
    setOption,
    selectedOptionId,
    children 
  }:{ 
    options: IOfferFilter[],
    setOption: (id: number) => void,
    selectedOptionId: number | null,
    children?: ReactNode }) => {
  return (
    <fieldset>
      <div className="mt-2">
        {options.map((option, optionIdx) => (
          <label key={optionIdx} className="relative flex items-start pt-3 gap-3">
            <div className="flex h-6 items-center relative">
              <input
                id={`side-${option.id ?? 'none'}`}
                name="plan"
                type="radio"
                onChange={() => { setOption(option.id) }}
                className="h-4 w-4 opacity-0 z-10"
                checked={selectedOptionId === option.id}
              />
              <div className={classNames(
                'h-[14px] w-[14px] border rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                selectedOptionId === option.id
                  ? 'border-white bg-white'
                  : 'border-graySecondary'
              )}>
                {selectedOptionId === option.id && (
                  <div className="h-2 w-2 rounded-full bg-swViolet" />
                )}
              </div>
            </div>
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor={`side-${option.id ?? 'none'}`} className={classNames('select-none font-medium', selectedOptionId === option.id ? 'text-white' : 'text-graySecondary')}>
                {option.name}
              </label>
            </div>
            {children}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default RadioGroup
