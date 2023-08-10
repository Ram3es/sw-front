
import Dropbox from '../../Content/Dropbox'
import { classNames } from '../../../helpers/className'
import { ReactComponent as Chevron } from '../../../assets/chevron-down.svg'
import { gamesLinks } from '../../../constants/games'
import { useAppContext } from '../../../context/AppContext'
import { ESteamAppId } from '../../../types/Inventory'

const DropdownGames = () => {
  const { gameId, updateGameId } = useAppContext()
  return (
    <Dropbox
        label={(isOpen) => (
        <div className={classNames('w-full flex items-center justify-between duration-100',
          isOpen ? 'text-white' : 'text-graySecondary'
        )}>
            <span className='text-lg uppercase'>{Object.keys(ESteamAppId)[Object.values(ESteamAppId).indexOf(gameId)]}</span>
            <Chevron
                className={classNames('fill-current h-[12px] w-[12px]', isOpen ? 'rotate-180' : '')}
            />
        </div>)}
        additionalClasses='px-[0px] [&>svg]:hidden'
    >
            <div className='flex flex-col gap-5 mt-6 mb-10 p-6 bg-darkGrey corner-lb-clip-4'>
                {gamesLinks.map((game) => (
                     <div
                       key={game.id}
                       className="flex flex-col items-center gap-3 w-full cursor-pointer"
                       onClick={() => { updateGameId(game.id) }}
                      >
                     <div className={ classNames('relative w-full max-w-[380px]', gameId === game.id ? 'border border-swViolet' : '')}>
                       {game.bg
                         ? <img className="w-full" src={game.bg} alt={game.name} />
                         : <div className='w-full h-[112px] bg-gray-500' />}
                       {game.logo
                         ? <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                         <img src={game.logo} alt={game.name} />
                       </div>
                         : ''}
                     </div>
                     <div className='uppercase text-base text-graySecondary font-["Barlow"] font-light'>
                       {game.name}
                     </div>
                     <div className='text-graySecondary text-center text-sm font-["Barlow"] font-light'>
                       {game.description}
                     </div>
                   </div>
                ))}

            </div>
        </Dropbox>
  )
}

export default DropdownGames
