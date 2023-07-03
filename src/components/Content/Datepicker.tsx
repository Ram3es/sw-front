import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatepickerProps {
  selectedDate?: Date;
  onChange: (date: Date) => void;
  label: string;
}

const Datepicker: React.FC<DatepickerProps> = ({ selectedDate, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-full relative'>
      <button className='w-full px-3 py-1 bg-darkGrey felx flex-col items-start' onClick={toggleCalendar}>
        <div className=' text-graySecondary text-[11px] font-["Barlow"] text-start'>{label}</div>
        <div className="text-white text-sm font-['Barlow'] text-start">
          {selectedDate ? selectedDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }).replaceAll("/", ".") : <div className='h-6' />}
        </div>
      </button>
      {isOpen && (
        <div ref={divRef} className='absolute top-full left-0 w-full h-full z-10'>
          <DatePicker
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
  );
};

export default Datepicker;