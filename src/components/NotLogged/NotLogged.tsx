import { Button } from "../Navigation";

export const NotLogged = () => {
  return (
    <div className='flex flex-grow justify-center items-center'>
      <div className='flex flex-col w-[450px] h-[152px] justify-between items-center text-white'>
        <span>PLEASE LOGIN TO BEGIN SELLING</span>
        <span>some text</span>
        <div>
          <Button
            className='flex justify-center mr-[20px] w-[158px] h-[40px] uppercase font-semibold text-skinwalletPink border border-skinwalletPink cta-clip-path bg-transparent role-button hover:bg-skinwalletPink hover:text-black'
            text="log in"
          />
          <Button
            className='flex justify-center w-[158px] h-[40px] uppercase font-semibold text-skinwalletPink border border-skinwalletPink cta-clip-path bg-transparent role-button hover:bg-skinwalletPink hover:text-black'
            text="sign in"
          />
        </div>
      </div>
    </div>
  );
}