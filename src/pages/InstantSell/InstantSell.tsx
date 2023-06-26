import Bar from '../../components/Bar/Bar';
import { Button } from '../../components/Navigation'

export default function InstantSell() {
  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium'>INSTANT SELL</h1>
        </div>
      </Bar>
      <div className='flex flex-col'>
        <div className='flex items-center h-[50px] border-b border-solid border-sidebarGrey px-[8px]'>
          <Button className='font-medium text-skinwallerGray hover:text-white' text='your inventory'/>
          <Button className='font-medium text-skinwallerGray hover:text-white' text='payout'/>
          <Button className='font-medium text-skinwallerGray hover:text-white' text='bonus'/>
        </div>
        <div className='px-[24px] h-9'></div>
      </div>
      <div className='flex flex-col fixed right-0 top-[60px] max-w-[429px] w-full h-[calc(100vh-60px)] bg-sidebarGrey'></div>
    </>
  )
}