import Link from "next/link"
import SteamIcon from '../../components/icons/SteamIcon'
import { API_BASE_URL } from "@/services/axios.instance"


export default function Signin() {
  return (
        <div className="flex justify-center ">
          <div className=" flex flex-col items-center w-full max-w-[512px] py-20 text-white ">
            <h1 className="text-5xl uppercase mb-16 ">Welcome Back</h1>
            <div className="w-full h-14">
              <Link
                href={`${API_BASE_URL}/auth/steam`}
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