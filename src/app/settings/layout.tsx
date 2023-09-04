
import Bar from '@/components/Bar/Bar';
import React from 'react';
import NavBar from './components/NavBar';
import Heading from './components/Heading';
import TopBar from '@/components/TopBar/TopBar';
import { Providers } from '@/providers/providers';



const LayoutSettings = ({ children }: { children: React.ReactNode}) => {
    return (
      <Providers>
        <>
          <TopBar isHidableOnScroll={true} />
          <Bar>
            <Heading/>
          </Bar>
          <NavBar />
          {children}
        </>
      </Providers>
    
    );
};

export default LayoutSettings;