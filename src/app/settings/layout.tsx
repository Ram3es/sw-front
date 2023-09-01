import Bar from '@/components/Bar/Bar';
import React from 'react';
import NavBar from './components/NavBar';


const LayoutSettings = ({ children }: { children: React.ReactNode}) => {
    return (
    <>
      <Bar>
        <div className="flex justify-between items-center h-full px-6">
          <h1 className='text-white font-Barlow text-[21px] font-medium uppercase'>
            Settings
          </h1>
        </div>
      </Bar>
      <NavBar />
      {children}
    </>
    );
};

export default LayoutSettings;