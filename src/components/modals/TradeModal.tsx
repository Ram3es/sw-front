
import ModalWrapper from '../../containers/Modal'
import PopupWrapper from '../../containers/PopupWrapper'
import { Button } from '../Navigation'

interface ITradeModal {
  title: string
  description: string
  submitBtnText: string
  cancelBtnText?: string
  submitFn: () => void
  cancelFn: () => void
}

const TradeModal = ({ title, description, submitBtnText, cancelBtnText, submitFn, cancelFn }: ITradeModal) => {
  return (
        <ModalWrapper className='flex justify-center items-center'>
            <PopupWrapper wrapperClasses='w-full max-w-[334px] sm:max-w-[640px]'>
                <div className='flex flex-col text-darkSecondary'>
                    <h1 className=' uppercase font-semibold text-2xl tracking-[1.2px] mb-4 '>{title}</h1>
                    <p>{description}</p>
                    <div className='w-full flex flex-col-reverse sm:flex-row justify-end items-center gap-4 mt-10 sm:mt-14'>
                        <Button
                          text={cancelBtnText ?? 'cancel'}
                          onClick={cancelFn}
                          className='w-full sm:w-max justify-center  border border-darkSecondary uppercase relative small-caps text-lg cta-clip-path'
                          heightClass='h-10'
                        >
                          <span className="absolute  -left-[2px] bottom-[2px] w-[12px] rotate-45 border-t border-darkSecondary overflow-hidden" />
                        </Button>
                        <Button
                          text= {submitBtnText ?? 'Update your Steam Trade URL' }
                          onClick={submitFn}
                          className='w-full sm:w-max justify-center items-start text-white leading-[18px]  bg-darkSecondary uppercase text-base sm:text-lg [&>.text]:mb-0.5 small-caps cta-clip-path'
                          heightClass='h-10'
                        />
                    </div>
                </div>
            </PopupWrapper>
        </ModalWrapper>
  )
}

export default TradeModal
