'use client'
import { Button } from '../Navigation'
import { useAppContext } from '@/context/AppContext'
import { URLS } from '@/constants/common'
import Link from 'next/link'
import Loader from '../Content/Loader'

export const IsUserLogged = ({ children }: { children: JSX.Element }) => {
  const { user, isUserLoading } = useAppContext()
  
  return (
    <>
      {isUserLoading ? (
         <Loader />
        ) : user?.id
        ? (
            children
          )
        : (
        <div className="flex flex-grow justify-center items-center">
          <div className='flex flex-col w-[450px] h-[152px] justify-between font-Barlow items-center text-white'>
            <span className="tracking-wider text-2xl">
              PLEASE LOGIN TO BEGIN SELLING
            </span>
            <span className="text-base font-light">some text</span>
            <div className="flex gap-5">
              <Link
              href={URLS.signinPage}
              >
                <Button
                  className="flex justify-center relative mr-[20px] w-[158px] h-[40px] uppercase font-semibold text-skinwalletPink border border-skinwalletPink cta-clip-path bg-transparent role-button hover:bg-skinwalletPink hover:text-black"
                  text="log in"
                >
                  <span className="absolute group-hover:hidden -left-[2px] bottom-[1px] w-[10px] rotate-45 border-skinwalletPink border-t-[3px]" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
          )}
    </>
  )
}
