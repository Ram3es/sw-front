import MethodCard from '../../../components/Content/MethodCard'
import { FUND_METHODS } from '../../../constants/fundsMethods'
import { Button } from '../../../components/Navigation'
import { classNames } from '../../../helpers/className'
import { useFundsContext } from '../../../context/FundsContext'

const SelectMethod = () => {
  const { selectedMethod, setSelectedMethod, setAddFundsStep } = useFundsContext()
  return (
        <div className='w-full text-white'>
            <h3 className='tracking-[1.12px] text-graySecondary uppercase text-sm'>step 1</h3>
            <h2 className='uppercase tracking-[1.28px]'>select top-up method</h2>
            <div className='grid grid-cols-methods justify-center mt-8 gap-4'>
                {FUND_METHODS.map(mth =>
                    <div key={mth.methodName}>
                        <MethodCard
                          onSelect={() => { selectedMethod?.methodName !== mth.methodName && setSelectedMethod({ methodName: mth.methodName, title: mth.title }) }}
                          isSelected={ selectedMethod?.methodName === mth.methodName }
                          {...mth}
                        />
                    </div>)}
            </div>
            <Button
              text='Next'
              onClick={() => { setAddFundsStep(2) }}
              className={classNames('bg-skinwalletPink justify-center items-center w-[100px] h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                selectedMethod ? '' : 'pointer-events-none grayscale opacity-50')}
            />
        </div>
  )
}

export default SelectMethod
