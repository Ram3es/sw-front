
import Bar from '@/components/Bar/Bar';
import React from 'react';
import NavBar from './components/NavBar';
import Heading from './components/Heading';
import ToastManager from '@/containers/ToastManager';




const LayoutSettings = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className='relative'>
          <Bar>
            <Heading/>
            <ToastManager />
          </Bar>
          <NavBar />
          {children}
        </div>
    );
};

export default LayoutSettings;