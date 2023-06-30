import { Button } from '../../../components/Navigation'
import { ReactComponent as Chevron } from '../../../assets/chevron-down.svg'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IFilters {
  onSelectAll: () => void;
}

export const Filters = ({onSelectAll}: IFilters) => {
  return (
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
        onClick={onSelectAll}
      />
      <Button
        className='font-medium text-skinwallerGray hover:text-white'
        text='Reload'
      />
    </div>
  );
};