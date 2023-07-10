import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { classNames } from '../../helpers/className'

import { ReactComponent as Chevron } from '../../assets/chevron-down.svg'

const langs = [
  { id: 1, name: 'english' },
  { id: 2, name: 'spanish' }
]

const LanguagePicker = () => {
  const [selected, setSelected] = useState(langs[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
    {({ open }) => (
      <>
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full flex gap-2 items-center cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.25781 4.60938C6.25781 4.39844 6.08203 4.22266 5.83594 4.22266C5.73047 4.22266 5.625 4.25781 5.55469 4.32812L4.67578 5.24219C4.60547 5.3125 4.57031 5.41797 4.57031 5.52344C4.57031 5.73438 4.74609 5.91016 4.95703 5.91016H5.51953C5.625 5.91016 5.73047 5.875 5.80078 5.80469L6.11719 5.45312C6.1875 5.38281 6.25781 5.27734 6.25781 5.17188V4.60938ZM8.71875 0.53125C3.90234 0.53125 0 4.43359 0 9.25C0 14.0664 3.90234 17.9688 8.71875 17.9688C13.5352 17.9688 17.4375 14.0664 17.4375 9.25C17.4375 4.43359 13.5352 0.53125 8.71875 0.53125ZM14.8711 12.6602H14.3789C14.2031 12.6602 14.0625 12.5898 13.9219 12.4844L13.3242 11.8516C13.1133 11.6406 12.832 11.5352 12.5156 11.5352H11.8828L10.3711 10.2344C10.0898 9.98828 9.70312 9.84766 9.31641 9.84766H8.22656C7.94531 9.84766 7.66406 9.91797 7.41797 10.0586L5.90625 10.9727C5.41406 11.2539 5.13281 11.7812 5.13281 12.3438V13.1875C5.13281 13.6797 5.34375 14.1719 5.76562 14.4531L6.53906 15.0508C6.85547 15.2969 7.41797 15.4727 7.80469 15.4727H8.50781C8.82422 15.4727 9.07031 15.7188 9.07031 16.0352V16.2812C8.92969 16.2812 8.82422 16.2812 8.71875 16.2812C4.81641 16.2812 1.6875 13.1523 1.6875 9.25C1.6875 5.45312 4.71094 2.35938 8.50781 2.25391L7.48828 2.99219C7.41797 3.0625 7.38281 3.13281 7.38281 3.23828V3.94141C7.38281 4.08203 7.48828 4.22266 7.66406 4.22266H8.22656C8.36719 4.22266 8.50781 4.08203 8.50781 3.94141V3.66016L9.07031 3.09766H9.77344C10.0195 3.09766 10.1953 3.27344 10.1953 3.48438C10.1953 3.58984 10.125 3.69531 10.0547 3.76562L9.14062 4.71484C9.07031 4.75 9.03516 4.78516 8.96484 4.82031L7.55859 5.27734C7.45312 5.3125 7.38281 5.41797 7.38281 5.55859C7.38281 5.76953 7.27734 5.98047 7.10156 6.15625L6.39844 6.85938C6.29297 6.96484 6.25781 7.10547 6.25781 7.24609V8.16016C6.25781 8.47656 6.50391 8.72266 6.82031 8.72266H7.59375C7.80469 8.72266 7.98047 8.58203 8.08594 8.40625L8.40234 7.73828C8.47266 7.66797 8.57812 7.59766 8.68359 7.59766H8.78906C8.92969 7.59766 9.07031 7.73828 9.07031 7.87891C9.07031 8.01953 9.17578 8.16016 9.35156 8.16016H9.91406C10.0547 8.16016 10.1953 8.01953 10.1953 7.87891V7.80859C10.1953 7.66797 10.2656 7.5625 10.3711 7.52734L11.4961 7.17578C11.707 7.07031 11.8828 6.85938 11.8828 6.61328V6.47266C11.8828 6.15625 12.1289 5.91016 12.4453 5.91016H13.7109C13.957 5.91016 14.1328 6.08594 14.1328 6.29688V6.64844C14.1328 6.85938 13.957 7.03516 13.7109 7.03516H12.5859C12.4805 7.03516 12.4102 7.07031 12.3047 7.14062L11.9883 7.49219C11.918 7.5625 11.8828 7.66797 11.8828 7.77344C11.8828 7.98438 12.0586 8.16016 12.2695 8.16016H12.832C12.9375 8.16016 13.043 8.19531 13.1133 8.26562L13.4297 8.61719C13.5352 8.6875 13.5703 8.79297 13.5703 8.89844V9.17969L13.1133 9.63672C12.9727 9.77734 12.9727 10.0586 13.1133 10.2344L14.2383 11.3594C14.3438 11.4648 14.4844 11.5352 14.625 11.5352H15.3633C15.2227 11.9219 15.0469 12.3086 14.8711 12.6602Z" fill="#A4A4A4"/>
            </svg>
            <span className="block truncate uppercase text-xs text-graySecondary">{selected.name}</span>
            <Chevron
              className={classNames('fill-graySecondary h-[12px] w-[12px]', open ? 'rotate-180' : '')}
            />
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto">
              {langs.map((lang) => (
                <Listbox.Option
                  key={lang.id}
                  // @ts-expect-error should be fixed
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={lang}
                >
                  {/* @ts-expect-error should be fixed */}
                  {({ selected, active }) => (
                    <>
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate uppercase text-xs text-graySecondary cursor-pointer')}>
                        {lang.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
  )
}

export default LanguagePicker
