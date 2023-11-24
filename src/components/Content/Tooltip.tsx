import React from 'react';

const Tooltip = ({content}: {content: string}) => {
    return (
        <div className=''>
          <div className='w-max p-2 relative bg-graySecondary text-black text-sm'>
            {content}
            <div className='absolute -top-1 left-4 w-3 h-3 rotate-45 bg-inherit '/>
          </div>
        </div>
    );
};

export default Tooltip;