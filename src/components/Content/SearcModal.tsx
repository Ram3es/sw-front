import React from 'react'
import ModalWrapper from '../../containers/Modal'
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg'
import { ReactComponent as CloseIcon } from '../../assets/close-icon.svg'
import { classNames } from '../../helpers/className'
import { useSearch } from '../../helpers/useSearch'

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { searchValue, isShownSuggestions, setSearchValue } = useSearch()
  return (
    isOpen
      ? (
        <ModalWrapper>
            <div className='w-full bg-dark-14  text-graySecondary'>
                <div className='w-full max-w-[768px] h-16 mx-auto  '>
                    <div className='w-full h-full  flex items-center gap-3  '>
                      <SearchIcon className={classNames('fill-skinwallerGray h-[21px] w-[21px]')}/>
                      <input
                        type='text'
                        value={searchValue}
                        placeholder={'Search Dota 2 items'}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                        className=' w-full bg-transparent outline-none text-lg placeholder:text-graySecondary/50 placeholder:font-Barlow '
                       />
                       <CloseIcon
                         onClick={() => { onClose() }}
                         className='button hover:text-white'
                       />
                    </div>
                    {isShownSuggestions && (
                        <div className=' py-6 px-8 bg-darkGrey cta-clip-path ' >
                        <span className='uppercase'>suggestions</span>
                    </div>

                    )}
                </div>
            </div>
        </ModalWrapper>
        )
      : null
  )
}

export default SearchModal
