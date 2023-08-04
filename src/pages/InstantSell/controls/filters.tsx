import { Button } from '../../../components/Navigation'
import { ReactComponent as Chevron } from '../../../assets/chevron-down.svg'
import Checkbox from '../../../components/Content/Checkbox'

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IFilters {
  onSelectAll: () => void
  toggleSort?: () => void
  isAsc?: boolean
  isSelectedAll: boolean
  onReaload?: () => void
}

export const Filters = ({ onSelectAll, toggleSort, isAsc, isSelectedAll, onReaload }: IFilters) => {
  return (
    <div className='flex items-center relative'>
      {toggleSort
        ? <Button
        text={`price ${isAsc ? 'ascending' : 'descending'}`}
        onClick={toggleSort}
        className=' text-graySecondary  uppercase text-sm hover:text-white '
        icon={
          <Chevron
            className={classNames(
              'fill-current h-[12px] w-[12px]',
              isAsc ? 'rotate-180' : ''
            )}
          />
        }
        iconRight
      />
        : ''}
      <Button
        className='font-medium text-skinwallerGray hover:text-white'
        text='Select All'
        onClick={onSelectAll}
        icon={
          <Checkbox
            checked={isSelectedAll}
            activeClass='bg-transparent [&_svg]:text-skinwallerGray pointer-events-none border-graySecondary'
            />
        }
      />
      {onReaload
        ? <Button
        className='font-medium text-skinwallerGray hover:text-white'
        text='Reload'
        onClick={onReaload}
      />
        : ''}

    </div>
  )
}
