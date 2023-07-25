import React from 'react'
import { FOOTER_LINKS } from '../../constants/footer'
import { Link, NavLink } from 'react-router-dom'
import { PAYMENT_METHODS, SOCIAL_LINKS } from '../../constants/sidebar-links'
import LanguagePicker from '../Content/LanguagePicker'

const Footer = () => {
  return (
        <div className=' w-full bg-black py-8 px-6 text-graySecondary'>
          <div className='grid grid-cols-[1fr_3fr_1fr] '>
            <div className='flex flex-col justify-between text-xs ' >
               <div className='min-w-[200px] mr-[120px]'>Powered by Steam. Not affiliated with Valve Corp.</div>
               <span>© 2021 Skinwallet</span>
            </div>
               <div className='flex flex-col justify-between '>
                 <div className='grid grid-cols-footer'>
                   {FOOTER_LINKS.map((links, idx) => <div key={idx} className='flex flex-col gap-4 mb-4 uppercase'>
                     {links.map((link) =>
                        <NavLink
                          key={link.title}
                          to={link.path}
                          className=' w-max text-sm tracking-[1.12px] hover:text-white duration-200'
                          >
                          {link.title}
                        </NavLink>)}
                      </div>)}
                    </div>
                    <div className='flex flex-wrap mt-20 gap-4 items-center'>
                        {PAYMENT_METHODS.map((method) => <div key={method.title}>{method.icon}</div>)}
                    </div>
                  </div>
                  <div className='flex flex-col justify-between items-end'>
                    <div className='flex flex-wrap justify-end items-center gap-6 max-w-[160px]'>
                      {SOCIAL_LINKS.map(social =>
                        <Link
                            key={social.title}
                            to={social.path}
                            className='hover:text-white duration-200'
                        >
                            {social.icon}
                        </Link>)
                      }
                    </div>
                    <div className='mb-1' >
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
