'use client'
import Link from "next/link"
import { redirect } from 'next/navigation';
import { URLS } from "@/constants/common";
import { useEffect, useState } from "react";
import { useAppContext } from '../../context/AppContext'

export default function SuccessAuth () {
  // if continueUrl provided save continueUrl to localStorage
  const { user } = useAppContext()

  if (!user?.username) {
    // redirect to home page if user is logged in
    return redirect(URLS.signinPage)
  }

  if (typeof window !== 'undefined') {
    const continueUrl = window.localStorage.getItem('continueUrl') || URLS.loggedInRedirect; 
    window.localStorage.removeItem('continueUrl');
    return redirect(continueUrl);
  }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000)
  }, [])

  return isLoading ? (
    <div className="flex justify-center"></div>
  ) : (
    <div className="flex justify-center ">
      <div>Some thing wrong</div>
      <Link href={URLS.homePage}>
        To home page
      </Link>
    </div>
  )
}