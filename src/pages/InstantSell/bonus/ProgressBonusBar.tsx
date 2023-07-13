
import { BONUS_POINTS } from '../../../constants/bonus-bar'

const ProgressScale = () => {
  return (
        <div className='relative'>
            <div className='w-full h-5 flex justify-between px-10 sm:px-14'>
                {BONUS_POINTS.map((item, idx) => <div key={item.percent} className={`w-[2px] h-full ${idx > 0 ? 'bg-gray-42' : 'bg-swViolet'} `} />)}
            </div>
            <div className='w-full px-10 sm:px-14  absolute  left-0 top-1/2 -translate-y-1/2'>
                <div className='w-full h-1 relative bg-gray-42'>
                    <div
                        className={' absolute inset-0 bg-swViolet'}
                        style={{ width: `${3}%` }}
                    />
                </div>
            </div>
            <div className='absolute h-1 w-5 ml-5 sm:ml-9 bg-swViolet left-0 top-1/2 -translate-y-1/2' />
            <div className='absolute h-1 w-5 mr-5 sm:mr-9 bg-gray-42 right-0 top-1/2 -translate-y-1/2'/>
        </div>
  )
}

const ProgressBonusBar = () => {
  return (
        <div className='w-full max-w-[685px] flex justify-between items-center p-4 sm:p-8  font-Barlow bg-darkGrey bonus-wrapper-hexagon'>
            {BONUS_POINTS.map(card => (
                <div key={card.percent} className='w-fit flex flex-col items-center gap-4 z-[5]'>
                    <img src={card.icon} alt="level-logo" />
                    <div className={`px-2.5 py-1.5 flex items-center justify-center ${card.percent < 1 ? 'bg-swViolet' : 'bg-darkGrey is-border'} bonus-percent-hexagon `}>
                        <div className={`w-full h-full center flex items-center justify-center ${card.percent < 1 ? 'text-white' : 'text-graySecondary'}  text-base font-medium z-10`}>
                            +{card.percent}%
                        </div>
                    </div>
                    <div className={`mt-4 ${card.percent < 1 ? 'text-white' : 'text-graySecondary'} `}>${0}.00</div>
                </div>
            ))}
           <div className='w-full absolute left-0 bottom-[25%] sm:bottom-[30%] '>
                <ProgressScale />
           </div>
        </div>
  )
}

export default ProgressBonusBar
