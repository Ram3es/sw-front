'use client'
import Link from "next/link"
import SteamIcon from '../../components/icons/SteamIcon'
import { useAppContext } from '../../context/AppContext'
import { redirect } from 'next/navigation';
import { NextPageContext } from "next"
import { URLS } from "@/constants/common";
import { useEffect, useState } from "react";

export default function Signin(ctx: NextPageContext & { searchParams: any }) {
  const { searchParams } = ctx;
  const continueUrl = searchParams?.continueUrl || '/'
  const { user } = useAppContext()
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  if (user?.username) {
    // redirect to home page if user is logged in
    return redirect(URLS.loggedInRedirect)
  }

  // if continueUrl provided save continueUrl to localStorage
  if (isClient)  {
    if (continueUrl) {
      window.localStorage.setItem('continueUrl', continueUrl)
    }
  }

  return (
        <div className="flex justify-center ">
          <div className=" flex flex-col items-center w-full max-w-[512px] py-20 text-white ">
            <h1 className="text-5xl uppercase mb-16 ">Welcome Back</h1>
            <div className="w-full h-14">
              <Link
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/steam`}
                className='flex justify-center text-lg text-white w-full h-full uppercase bg-darkBlue hover:opacity-80 gap-2 py-2 px-4 button'
              >
                <SteamIcon />
                <div className="pl-4">Login with steam</div>
              </Link>
            </div>
          </div>
        </div>
  )
}