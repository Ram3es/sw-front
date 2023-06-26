import Bar from '../../components/Bar/Bar';

export default function InstantSell() {
  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium'>INSTANT SELL</h1>
        </div>
      </Bar>
      <div className='flex flex-col'>
        <div className='flex h-[50px] border-b border-solid border-sidebarGrey'></div>
        <div className=''></div>
      </div>
      <div className='flex flex-col fixed right-0 top-[60px] max-w-[429px] w-full h-[calc(100vh-60px)] bg-sidebarGrey'></div>
    </>
  )
}