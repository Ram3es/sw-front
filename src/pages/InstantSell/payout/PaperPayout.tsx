import React from 'react';

    const PaperPayout = ({ title, children } : { title: string, children: JSX.Element } ) => {
    return (
        <div className='w-full  flex flex-col gap-4 px-9 py-6 text-sm text-white font-Barlow bg-almostBlack cta-clip-path '>
        <h4 className='uppercase tracking-widest'>{title}</h4>
            {children}
        </div>
    );
};

export default PaperPayout;