import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { classNames } from '../../helpers/className'

interface DatepickerProps {
  selectedDate?: Date
  onChange: (date: Date) => void
  label: string
  align?: 'left' | 'right'
}

const Datepicker: React.FC<DatepickerProps> = ({ selectedDate, onChange, label, align }) => {
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleCalendar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='w-full relative'>
      <button className='w-full px-3 py-1 bg-darkGrey felx flex-col items-start' onClick={toggleCalendar}>
        <div className=' text-graySecondary text-[11px] font-["Barlow"] text-start'>{label}</div>
        <div className="text-white text-sm font-['Barlow'] text-start">
          {selectedDate
            ? selectedDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).replaceAll('/', '.')
            : <div className='h-6' />}
        </div>
      </button>
      {isOpen && (
        <div
          ref={divRef}
          className='absolute top-full w-full h-full z-10'
        >
          <DatePicker
            calendarClassName={classNames(
              'absolute z-10',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            selected={selectedDate}
            onChange={onChange}
            inline
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
      )}
    </div>
  )
}

export default Datepicker
