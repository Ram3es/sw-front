import React from 'react';
import ClockIconNoFilled from '../icons/ClockIconNoFilled';


const TradeLockStatuses = ({ value } : { value: number }) => {
    return (
        <div className={`flex items-center gap-1.5 mt-7 ${ value > 0 ? 'text-swOrange' : 'text-swLime' }`}>
            <ClockIconNoFilled/>
            <span className='uppercase text-xs tracking-[0.96px]'>{
                value > 0 ? `less than ${value}  ${value === 1 ? 'day' : 'days' } locked` : 'tradable'
            }</span>
        </div>
    );
};

export default TradeLockStatuses;