import SettingField from '../../../containers/SettingField'
import InformationIcon from '../../../components/icons/InformationIcon'
import ErrorLabelRounded from '../../../components/funds/ErrorLabelRounded'
import { useRouter } from 'next/navigation'

const BillingField = () => {
  const { push } = useRouter()
  const data = true
  return (
        <SettingField
          title='billing'
          icon={<InformationIcon iconClasses='w-[14px] h-auto' />}
          editableFn={() => { push('/settings/billing-info') }}
         >
          {data
            ? (
                <div className='max-w-[300px] flex flex-col gap-6 text-white'>
                  <div className='flex flex-col'>
                    Skins and More Co.
                    <span className='font-normal'> PL1234567890 </span>
                  </div>
                  <div className='flex flex-col'>
                    Christopher Kowalski
                    <p className='font-normal'>ul. Wojska Polskiego 214/4 71-000 Szczecin, Poland </p>
                  </div>
                  <span>18.05.1986</span>
                </div>
              )
            : <ErrorLabelRounded isError={true} message='missing data' />}
        </SettingField>
  )
}

export default BillingField