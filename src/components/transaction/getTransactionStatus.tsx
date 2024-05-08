import { ETransactionStatus, ETransactionType } from '@/types/Transactions';
import RoundedMark from '../icons/RoundedMark';
import { TRX_CARD_CONTENT } from '@/constants/transactions';
import ReloadIcon from '../icons/ReloadIcon';

 export const getTransactionStatus = (type: ETransactionType, status: ETransactionStatus) => {
    switch (status) {
      case ETransactionStatus.complete:
        return (
          <div className='flex items-start gap-2 text-swLime ' >
            <RoundedMark className='shrink-0' />
            <p className='leading-4'>{TRX_CARD_CONTENT[type].status}</p>
          </div>
        )
       
        case ETransactionStatus.pending:
        case ETransactionStatus.processing:
        case ETransactionStatus.sent:
          return (
            <div className='flex items-start gap-2 text-swOrange'>
              <ReloadIcon className='shrink-0 ' />
              <p className='leading-4'>{TRX_CARD_CONTENT[type].status}</p>
            </div>
          )

    }
};
