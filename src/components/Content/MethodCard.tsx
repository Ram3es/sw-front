import { type FC } from 'react'
import { type IMethod } from '../../constants/fundsMethods'
import CardWrapper from '../../container/CardWrapper'

interface IMethodCardProps extends IMethod {
  isSelected: boolean
  onSelect: () => void

}

const MethodCard: FC<IMethodCardProps> = ({ title, logo, isSelected, content, label, summary, onSelect }) => {
  return (
        <CardWrapper
          onSelect={onSelect}
          isSelected={isSelected}
          additionalClass='min-h-[270px]'
          >
            <div className='flex flex-col h-full w-full p-6 ' >
                <div className='flex items-center justify-between'>
                    <div className='text-lg font-normal capitalize'>{title}</div>
                    <div>{logo}</div>
                </div>
                <div className=' flex-grow flex flex-col justify-between text-xs'>
                  {content}
                  <div>
                    <div className=' uppercase text-graySecondary tracking-[0.96px]'>{label}</div>
                    <div className=' font-normal text-white leading-[14px] '> {summary}</div>
                  </div>
                </div>
            </div>
        </CardWrapper>
  )
}
export default MethodCard
