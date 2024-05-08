import { type ChangeEvent } from 'react'

interface CheckboxProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  activeClass?: string
  additionalClasses?: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, activeClass, additionalClasses }: CheckboxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    if (onChange) onChange(checked)
  }

  return (
    <label
      className={classNames(
        'relative w-[18px] h-[18px] border flex justify-center items-center cursor-pointer',
        activeClass ?? (checked ? 'bg-white border-white' : 'border-graySecondary'),
        additionalClasses ?? ''
      )}
    >
      <input
        className="opacity-0 absolute left-0 top-0 -z-10"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      {checked ? (
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.05469 9.8125C5.28906 10.0469 5.6875 10.0469 5.92188 9.8125L12.8125 2.92188C13.0469 2.6875 13.0469 2.28906 12.8125 2.05469L11.9688 1.21094C11.7344 0.976562 11.3594 0.976562 11.125 1.21094L5.5 6.83594L2.85156 4.21094C2.61719 3.97656 2.24219 3.97656 2.00781 4.21094L1.16406 5.05469C0.929688 5.28906 0.929688 5.6875 1.16406 5.92188L5.05469 9.8125Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        ''
      )}
    </label>
  )
}

export default Checkbox
