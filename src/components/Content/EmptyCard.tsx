
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowRight } from '../../assets/img/market/arrow-right.svg'

const EmptyCard = () => {
  return (
    <div className='relative h-full group hover:-translate-y-4 hover:z-20 duration-75'>
        <div
          className={'absolute left-0 top-0 w-full h-full border border-b-[3px] group-hover:border-0 border-darkGrey group-hover:bg-darkGrey card-clip-path'}
        >
          <span className={'absolute border-t border-darkGrey group-hover:hidden -right-[2px] top-[3px] w-[10px] rotate-45'} />
          <span className={'absolute border-t border-darkGrey group-hover:hidden -left-[2px] bottom-[1px] w-[10px] rotate-45'} />
        </div>
        <Link to={'/'} className=' relative h-full flex justify-center group-hover:h-[calc(100%_+_40px)] hover:bg-darkGrey text-white  cta-clip-path'>
           <div className=' absolute top-[180px] flex items-center gap-2 text-graySecondary group-hover:text-white '>
             <span className='tracking-[1.12px] uppercase'>see all</span>
             <ArrowRight />
           </div>
        </Link>

    </div>
  )
}

export default EmptyCard
