import { Button } from '../Navigation'
import Checkbox from '../Content/Checkbox'
import ChevronDown from '../icons/ChevronDown'


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
    <div className='flex items-center justify-between relative w-full xl:w-auto'>
      {toggleSort
        ? <Button
        text={`price ${isAsc ? 'ascending' : 'descending'}`}
        onClick={toggleSort}
        className=' text-graySecondary w-max uppercase text-xs sm:text-sm hover:text-white '
        icon={
          <ChevronDown
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
        className='text-sm md:text-base font-medium w-max text-skinwallerGray hover:text-white'
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
        className='text-sm md:text-base font-medium text-skinwallerGray hover:text-white'
        text='Reload'
        onClick={onReaload}
      />
        : ''}

    </div>
  )
}
