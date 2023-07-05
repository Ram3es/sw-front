import { Button } from '../../../components/Navigation'
import { ReactComponent as Chevron } from '../../../assets/chevron-down.svg'
import Dropbox from '../../../components/Content/Dropbox';
import { TSortOption, useSort } from '../../../helpers/useSort';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IFilters {
  onSelectAll: () => void;
  sortOptions: TSortOption[]
  setCurrentOption: (value: any) => void

}


export const Filters = ({onSelectAll, sortOptions, setCurrentOption}: IFilters) => { 
  

  return (
    <div className='flex items-center relative'>
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
      <Dropbox 
          label='VALUE'
          additionalClasses='gap-2 text-graySecondary text-sm tracking-[1.12px]'
          listClasses='absolute left-0 top-8 z-40 w-max text-graySecondary bg-darkGrey text-sm p-2' 
          onChange={setCurrentOption}
          options={sortOptions}
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