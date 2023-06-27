import Bar from '../../components/Bar/Bar';
import ItemCard from '../../components/Content/ItemCard';

export default function InstantSell() {
  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium'>INSTANT SELL</h1>
        </div>
      </Bar>
      <div className='grid grid-cols-7 px-6'>
        <ItemCard
          isTradable={true}
          timeToTrade={64}
          image="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v33dDBH_t26kL-HnvD8J_WElT8Gu5Eg27iVotv00Azg80ZtMDimIo-ceg45YAuCrFbtyenv1sW6ot2Xntd6B4y4/256fx256f"
          isSelected={false}
          isNoFee={true}
          price={1000000}
          name="★ Nomad Knife | Case Hardened"
          type="covert knife"
          condition={0.71156}
          onClick={() => console.log('click')}
          onCartAdd={() => console.log('add to cart')}
        />
      </div>
    </>
  )
}