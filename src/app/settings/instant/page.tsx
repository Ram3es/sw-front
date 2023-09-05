import WalletCard from "@/components/Content/WalletCard";
import EditPencil from "@/components/icons/EditPencil";
import InformationIcon from "@/components/icons/InformationIcon";
import { WALLETS } from "@/constants/settings";

export default function Instant() {
    return (
        <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] flex flex-col gap-8 mx-auto '>
            <div className="flex flex-col gap-4 text-graySecondary">
             {WALLETS.map(wallet => 
                <WalletCard
                  key={wallet.title}
                  title={wallet.title}
                  placeholder={wallet.text}
                 /> 
                )}
            </div>
          </div>
        </div>
    )
  }