import Link from 'next/link'
import {
  PAYMENT_METHODS,
  SIDEBAR_LINKS,
  SOCIAL_LINKS
} from '../../constants/sidebar-links'
import LanguagePicker from '../Content/LanguagePicker'

const SidebarLinks = () => {
  return (
    <>
      <div className="w-full border-t border-darkGrey" />
      <div className="p-6 w-full flex flex-col gap-8">
        <div className="flex gap-4 items-center flex-wrap">
          {SIDEBAR_LINKS.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="font-Barlow text-xs uppercase text-graySecondary">
                {item.title}
              </div>
              {index !== SIDEBAR_LINKS.length - 1 && (
                <div className="w-[3px] h-[3px] rounded-full bg-graySecondary" />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-Barlow text-xs uppercase text-graySecondary">
            Follow us
          </div>
          <div className="flex gap-6 flex-wrap text-graySecondary">
            {SOCIAL_LINKS.map((item, index) => (
              <Link key={index} href={item.path}>
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        <LanguagePicker />
        <div className="flex gap-6 items-center flex-wrap">
          {PAYMENT_METHODS.map((item, index) => (
            <div key={index}>{item.icon}</div>
          ))}
        </div>
        <p className="font-Barlow text-xs text-graySecondary leading-[18px]">
          Powered by Steam.
          <br />
          Not affiliated with Valve Corp.
        </p>
        <p className="font-Barlow text-xs text-graySecondary leading-[18px]">
          Skinwallet MT Limited 99, Sir Adrian Dingli Street, Sliema, Malta
        </p>
        <p className="font-Barlow text-xs text-graySecondary leading-[18px]">
          © 2021 Skinwallet
        </p>
      </div>
    </>
  )
}

export default SidebarLinks
