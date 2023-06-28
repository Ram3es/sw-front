import { Nav } from '../controls/nav';
import { Filters } from '../controls/filters';
import { useState } from 'react';
import { NotLogged } from '../../../components/NotLogged/NotLogged';
import ItemCard from '../../../components/Content/ItemCard';

export const Inventory = () => {
  const [user, setUser] = useState(true);
  const [selected, setSellected] = useState(false);

  return (
    <div className='flex flex-grow'>
      <div className='flex flex-col flex-grow'>
        <div className='flex justify-between h-[50px] border-b border-solid border-sidebarGrey px-[8px]'>
          <Nav />
          <Filters />
        </div>
        {
          user
            ? <div className='px-[24px] py-[30px] grid grid-cols-cards gap-1'>
                <ItemCard
                  isTradable={true}
                  timeToTrade={2}
                  image="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v33dDBH_t26kL-HnvD8J_WElT8Gu5Eg27iVotv00Azg80ZtMDimIo-ceg45YAuCrFbtyenv1sW6ot2Xntd6B4y4/256fx256f"
                  isSelected={selected}
                  isNoFee={true}
                  price={1000000}
                  name="★ Nomad Knife | Case Hardened"
                  type="covert knife"
                  condition={0.71156}
                  onClick={(isSelected) => setSellected(isSelected)}
                />
                <ItemCard
                  isTradable={false}
                  timeToTrade={64}
                  image="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v33dDBH_t26kL-HnvD8J_WElT8Gu5Eg27iVotv00Azg80ZtMDimIo-ceg45YAuCrFbtyenv1sW6ot2Xntd6B4y4/256fx256f"
                  isSelected={selected}
                  isNoFee={true}
                  price={1000000}
                  name="★ Nomad Knife | Case Hardened"
                  type="covert knife"
                  condition={0.71156}
                  onClick={(isSelected) => setSellected(isSelected)}
                />
              </div>
           : <NotLogged />
        }
      </div>
      <div className='sticky top-[60px] flex flex-col max-w-[429px] w-full h-[859px] side-bar-gradient cta-clip-path'></div>
    </div>
  );
};