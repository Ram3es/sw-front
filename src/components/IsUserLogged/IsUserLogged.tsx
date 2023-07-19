import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../Navigation'
import { useAppContext } from '../../context/AppContext'

export const IsUserLogged = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useAppContext()

  return (
    <>
      {user
        ? (
            children
          )
        : (
        <div className="flex flex-grow justify-center items-center">
          <div className='flex flex-col w-[450px] h-[152px] justify-between font-["Barlow"] items-center text-white'>
            <span className="tracking-wider text-2xl">
              PLEASE LOGIN TO BEGIN SELLING
            </span>
            <span className="text-base font-light">some text</span>
            <div className="flex gap-5">
              <Button
                className="flex justify-center relative mr-[20px] w-[158px] h-[40px] uppercase font-semibold text-skinwalletPink border border-skinwalletPink cta-clip-path bg-transparent role-button hover:bg-skinwalletPink hover:text-black"
                text="log in"
                onClick={() => {
                  navigate('/sign-in', { state: { from: pathname } })
                }}
              >
                <span className="absolute group-hover:hidden -left-[2px] bottom-[1px] w-[10px] rotate-45 border-skinwalletPink border-t-[3px]" />
              </Button>
              <Button
                className="flex relative justify-center w-[158px] h-[40px] uppercase font-semibold text-skinwalletPink border border-skinwalletPink cta-clip-path bg-transparent role-button hover:bg-skinwalletPink hover:text-black"
                text="sign in"
              >
                <span className="absolute group-hover:hidden -left-[2px] bottom-[1px] w-[10px] rotate-45 border-skinwalletPink border-t-[3px]" />
              </Button>
            </div>
          </div>
        </div>
          )}
    </>
  )
}
