import { type FC } from 'react'
import { type IMethod } from '../../constants/fundsMethods'
import CardWrapper from '../../containers/CardWrapper'
import { PayMethod } from '@/types/Wallet'
import { format } from '@/helpers/numberFormater'

interface IMethodCardProps extends IMethod {
  isSelected: boolean
  onSelect: () => void
  isNotActive?: boolean
  methodLimit: PayMethod
}

const MethodCard: FC<IMethodCardProps> = ({ 
  title,
  titleLabel,
  logo,
  isSelected, 
  renderContent,
  label,
  summary,
  onSelect,
  isNotActive,
  methodLimit }) => {
  
    const limit = `$${format(methodLimit.min)}  -  $${format(methodLimit.max)}`
    const fee = methodLimit.fee ? `${methodLimit.feePercentage * 100}%  +  $${format(methodLimit.fee)}` : `${methodLimit.feePercentage * 100}%`

  return (
        <CardWrapper
          onSelect={onSelect}
          isSelected={isSelected}
          additionalClass='min-h-[270px]'
          isNotActive={isNotActive}
          >
            <div className='flex flex-col h-full w-full p-6 ' >
                <div className='flex items-center justify-between'>
                    <div className='flex gap-3 items-center' >
                     <div className='text-lg font-normal capitalize'>{title}</div>
                     {titleLabel}
                    </div>
                    <div>{logo}</div>
                </div>
                <div className=' flex-grow flex flex-col justify-between text-xs'>
                  {renderContent?.({ limit, fee })}
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
