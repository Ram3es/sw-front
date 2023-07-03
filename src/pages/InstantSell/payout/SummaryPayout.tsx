
import { usePayoutContext } from '../../../context/PayoutContext';
import { format } from '../../../helpers/numberFormater';
import { Button } from '../../../components/Navigation';
import { useNavigate } from 'react-router-dom';

const SummaryPayout = () => {
    const { amount, setPayoutStep, setAmount } = usePayoutContext()
    const navigate = useNavigate()
 
    const handleViewMore = () => {
        navigate('/instant-sell', { replace: true })
        setPayoutStep('amount')
        setAmount(0)
        
    }
     
    return (
        <div className=' flex flex-col items-center mx-auto gap-6 text-center max-w-[432px] text-white '>
            <div className=' uppercase tracking-[1.12px]'>
                <h6 className='text-swGrey mb-2'>summary</h6>
                <p className=' text-2xl leading-[24px]  max-w-[294px] '>
                    Your payout is being processed by paypal.
                </p>
            </div>
            <p className=' text-swGrey left-5'>
                As soon as PayPal finishes processing your payout, we will send you an email with the final status of this operation.
            </p>
            <div className=''>
                <h5 className='text-sm uppercase  tracking-[1.12px]'>total payout value</h5>
                <span className='text-swLime text-2xl'>${format(amount)}</span>
            </div>
            <div className=''>
                <h5 className='text-sm uppercase  tracking-[1.12px]'>fee value</h5>
                <span className='text-yellow-1e text-2xl'>${format(0)}</span>
            </div>
            <div className=' w-full flex gap-3 h-10 mt-4'>
                <Button 
                    text='view transaction'
                    onClick={() => console.log('view transaction')}
                    className=' w-1/2 h-full bg-swLime hover justify-center text-darkSecondary cta-clip-path uppercase ' 
                />
                <div className=' w-1/2 relative overflow-hidden hover button'>
                    <Button 
                        text='sell more items '
                        className=' w-full h-full border border-swGrey  hover justify-center cta-clip-path uppercase text-swGrey '
                        onClick={handleViewMore} 
                    />
                        <div className='absolute w-4 bottom-1 -left-1 border-b border-swGrey hover rotate-45' />
                </div>
            </div>
            
        </div>
    );
};

export default SummaryPayout;