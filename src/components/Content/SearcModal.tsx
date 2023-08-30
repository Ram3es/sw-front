import ModalWrapper from '../../containers/Modal'
import { classNames } from '../../helpers/className'
import { useSearch } from '../../helpers/useSearch'
import { gamesLinks } from '../../constants/games'
import { type ESteamAppId } from '../../types/Inventory'
import { useAppContext } from '../../context/AppContext'
import Image from 'next/image'

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { searchValue, isShownSuggestions, setSearchValue } = useSearch()
  const {
    gameId
  } = useAppContext()

  const getGameLinkNameById = (id: ESteamAppId) => {
    return gamesLinks.find((game) => game.id === id)?.name ?? ''
  }

  return (
    isOpen
      ? (
        <ModalWrapper>
            <div className='w-full bg-dark-14  text-graySecondary'>
                <div className='w-full max-w-[768px] h-16 mx-auto  '>
                    <div className='w-full h-full  flex items-center gap-3  '>
                      <Image
                        src="/search-icon.svg"
                        alt="search-icon"
                        width={21}
                        height={21}
                        className={classNames('fill-skinwallerGray h-[21px] w-[21px]')}
                      />
                      <input
                        type='text'
                        value={searchValue}
                        placeholder={`Search ${getGameLinkNameById(gameId)} items`}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                        className=' w-full bg-transparent outline-none text-lg placeholder:text-graySecondary/50 placeholder:font-Barlow '
                       />
                       <Image
                        width={13}
                        height={21}
                        src="/close-icon.svg"
                        alt="close-icon"
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
