
import Bar from '@/components/Bar/Bar';
import React from 'react';
import NavBar from './components/NavBar';
import Heading from './components/Heading';




const LayoutSettings = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className='relative'>
          <Bar>
            <Heading/>
          </Bar>
          <NavBar />
          {children}
        </div>
    );
};

export default LayoutSettings;