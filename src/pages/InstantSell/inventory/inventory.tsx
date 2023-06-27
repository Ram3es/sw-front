import { Nav } from '../controls/nav';
import { Filters } from '../controls/filters';
import { useState } from 'react';
import { NotLogged } from '../../../components/NotLogged/NotLogged';

export const Inventory = () => {
  const [user, setUser] = useState(false);

  return (
    <div className='flex flex-grow'>
      <div className='flex flex-col flex-grow'>
        <div className='flex justify-between h-[50px] border-b border-solid border-sidebarGrey px-[8px]'>
          <Nav />
          <Filters />
        </div>
        {
          user
            ? <div className='px-[24px] py-[30px] h-9'>
                {/* content */}
              </div>
           : <NotLogged />
        }
      </div>
      <div className='sticky top-[60px] flex flex-col max-w-[429px] w-full h-[859px] side-bar-gradient cta-clip-path'></div>
    </div>
  );
};