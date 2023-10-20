'use client'
import ModalWrapper from '../../containers/Modal'
import { useSearch } from '../../helpers/useSearch'
import { gamesLinks } from '../../constants/games'
import { type ESteamAppId } from '../../types/Inventory'
import { useAppContext } from '../../context/AppContext'
import SearchIcon from '../icons/top-bar/SearchIcon'
import CloseIcon from '../icons/CloseIcon'
import { ChangeEvent, KeyboardEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/helpers/useDebounce'

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { searchValue, isShownSuggestions, setSearchValue } = useSearch()
  const { push } = useRouter()
  const {
    gameId
  } = useAppContext()

 const {current: debounce} = useRef(useDebounce())

 const getSuggestion = debounce((value: string) => {
  console.log('get suggestion:', value)
 },1300)

  const handleChange  = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    if(e.target.value.length > 2){
      getSuggestion(e.target.value)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      if(searchValue){
        push(`/market/offers?appId=${gameId}&search=${searchValue}`)
      }
      onClose()
      setSearchValue('')
    }
  }

  const getGameLinkNameById = (id: ESteamAppId) => {
    return gamesLinks.find((game) => game.id === id)?.name ?? ''
  }

  return (
    isOpen
      ? (
        <ModalWrapper closeModal={onClose} className='bg-darkSecondary/80'>
            <div className='w-full bg-darkGrey  text-graySecondary'>
                <div className='w-full max-w-[768px] h-16 mx-auto'>
                    <div className='w-full h-full  flex items-center gap-3  '>
                      <SearchIcon className='fill-current w-[21px] h-[21px]' />
                      <input
                        type='text'
                        onKeyDown={handleKeyPress}
                        value={searchValue}
                        placeholder={`Search ${getGameLinkNameById(gameId)} items`}
                        onChange={handleChange}
                        className=' w-full bg-transparent outline-none text-lg placeholder:text-graySecondary/50 placeholder:font-Barlow '
                        autoFocus
                       />
                       <div onClick={() => onClose()} className='cursor-pointer hover:text-white duration-200'>
                         <CloseIcon className='w-[13px] h-[21px] ' />
                       </div>
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
