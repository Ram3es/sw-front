import MethodCard from '../../../components/Content/MethodCard'
import { FUND_METHODS } from '../../../constants/fundsMethods'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'

const SelectMethod = ({ selectedMethod, onSelectMethod, setStep }: { selectedMethod?: string, onSelectMethod: (method: string) => void, setStep: () => void }) => {
  return (
        <div className='w-full text-white'>
            <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>step 1</h3>
            <h2 className='uppercase tracking-[1.28px]'>select top-up method</h2>
            <div className='grid grid-cols-methods justify-center mt-8 gap-4'>
                {FUND_METHODS.map(method =>
                    <div key={method.methodName}>
                        <MethodCard
                          onSelect={() => { selectedMethod !== method.methodName && onSelectMethod(method.methodName) }}
                          isSelected={ selectedMethod === method.methodName }
                          {...method}
                        />
                    </div>)}
            </div>
            <Button
              text='Next'
              onClick={setStep}
              className={classNames('bg-skinwalletPink justify-center items-center w-[100px] h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                selectedMethod ? '' : 'pointer-events-none grayscale opacity-50')}
             />
        </div>
  )
}

export default SelectMethod
