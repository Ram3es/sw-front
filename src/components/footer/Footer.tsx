import { FOOTER_LINKS } from '../../constants/footer'
import { PAYMENT_METHODS, SOCIAL_LINKS } from '../../constants/sidebar-links'
import LanguagePicker from '../Content/LanguagePicker'
import { classNames } from '../../helpers/className'
import Link from 'next/link'

const Footer = () => {
  return (
        <div className=' w-full bg-black pt-8 pb-20 px-6 text-graySecondary'>
          <div className='flex gap-12 md:gap-0 flex-col-reverse md:grid md:grid-cols-[1fr_3fr_1fr] '>
            <div className='flex flex-col justify-between text-xs gap-12 md:gap-0' >
               <div className='min-w-[200px] mr-[120px]'>Powered by Steam. Not affiliated with Valve Corp.</div>
               <span>© 2021 Skinwallet</span>
            </div>
            <div className='block md:hidden mb-1' >
                        <LanguagePicker />
                    </div>
               <div className='flex flex-col justify-between '>
                 <div className='grid grid-cols-footer'>
                    {FOOTER_LINKS.map((links, idx) => <div key={idx} className={classNames('flex flex-col gap-4 mb-4 uppercase',
                      idx % 2 !== 0 ? 'text-end md:text-start' : ''
                    )}>
                     {links.map((link) =>
                        <Link
                          key={link.title}
                          href={link.path}
                          className=' w-max text-sm tracking-[1.12px] hover:text-white duration-200'
                          >
                          {link.title}
                        </Link>)}
                      </div>)}
                    </div>
                    <div className='flex flex-wrap mt-20 gap-4 items-center'>
                        {PAYMENT_METHODS.map((method) => <div key={method.title}>{method.icon}</div>)}
                    </div>
                  </div>

                  <div className='flex flex-col justify-between items-end'>
                    <div className='flex flex-wrap justify-between md:justify-end items-center gap-6 w-full md:max-w-[160px]'>
                      {SOCIAL_LINKS.map(social =>
                        <Link
                            key={social.title}
                            href={social.path}
                            className='hover:text-white duration-200'
                            target='_blank'
                        >
                            {social.icon}
                        </Link>)
                      }
                    </div>
                    <div className='hidden md:block mb-1' >
                        <LanguagePicker />
                    </div>
                  </div>
              </div>
            <div className='flex items-center justify-between'>
          </div>
        </div>
  )
}

export default Footer
