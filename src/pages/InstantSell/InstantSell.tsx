import Bar from '../../components/Bar/Bar';
import { Button } from '../../components/Navigation'
import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function InstantSell() {
  return (
    <>
      <Bar>
        <div className='flex justify-between items-center h-full px-6'>
          <h1 className='text-white font-["Barlow"] text-[21px] font-medium'>INSTANT SELL</h1>
        </div>
      </Bar>
      <div className='flex'>
        <div className='flex flex-col flex-grow'>
          <div className='flex justify-between h-[50px] border-b border-solid border-sidebarGrey px-[8px]'>
            <div className='flex items-center'>
              <Button className='uppercase font-medium text-skinwallerGray hover:text-white' text='your inventory'/>
              <Button className='uppercase font-medium text-skinwallerGray hover:text-white' text='payout'/>
              <Button className='uppercase font-medium text-skinwallerGray hover:text-white' text='bonus'/>
            </div>
            <div className='flex items-center'>
              <Button
                className='uppercase font-medium text-skinwallerGray hover:text-white'
                text='ALL'
                icon={
                  <Chevron
                    className={classNames(
                      'fill-skinwallerGray h-[12px] w-[12px]',
                    )}
                  />
                }
                iconRight
              />
              <Button
                className='uppercase font-medium text-skinwallerGray hover:text-white'
                text='value'
                icon={
                  <Chevron
                    className={classNames(
                      'fill-skinwallerGray h-[12px] w-[12px]',
                    )}
                  />
                }
                iconRight
              />
              <Button
                className='font-medium text-skinwallerGray hover:text-white'
                text='Select All'
              />
              <Button
                className='font-medium text-skinwallerGray hover:text-white'
                text='Reload'
              />
            </div>
          </div>
          <div className='px-[24px] py-[30px] h-9'>
            {/* content */}
          </div>
        </div>
        <div className='sticky top-[60px] flex flex-col max-w-[429px] w-full h-[400px] bg-sidebarGrey'></div>
      </div>
    </>
  )
}