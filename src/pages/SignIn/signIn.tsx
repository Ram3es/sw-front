import { useLocation } from 'react-router-dom'
import { Link } from '../../components/Navigation'
import SteamIcon from '../../components/icons/SteamIcon'
import { API_BASE_URL } from '../../services/axios.instance'

export default function SignIn () {
  const location = useLocation()
  return (
    <div className="flex justify-center ">
      <div className=" flex flex-col items-center w-full max-w-[512px] py-20 text-white ">
        <h1 className="text-5xl uppercase mb-16 ">Welcome Back</h1>
        <Link
          to={`${API_BASE_URL}/auth/steam?continue=${location?.state?.from as string ?? '/'}`}
          text='login with steam'
          icon
          wrapperStyles='w-full h-14 '
          className=' justify-center text-lg text-white w-full h-full uppercase bg-darkBlue hover:opacity-80 gap-2 py-2 px-4 button'
        >
          <SteamIcon />
        </Link>

      </div>
    </div>
  )
}
