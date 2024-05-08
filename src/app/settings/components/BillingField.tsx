import SettingField from '../../../containers/SettingField'
import InformationIcon from '../../../components/icons/InformationIcon'
import ErrorLabelRounded from '../../../components/funds/ErrorLabelRounded'
import { useRouter } from 'next/navigation'
import { useSettingsContext } from '@/context/SettingsContext'
import { format as formatDate } from 'date-fns'

const BillingField = () => {
  const { push } = useRouter()
  const { data } = useSettingsContext()

  return (
        <SettingField
          title='billing'
          icon={<InformationIcon iconClasses='w-[14px] h-auto' />}
          editableFn={() => { push('/settings/billing-info') }}
         >
          {data?.billingAddress.id
            ? (
                <div className='max-w-[300px] flex flex-col gap-6 text-white'>
                  <div className='flex flex-col'>
                    Skins and More Co.
                    <span className='font-normal'> PL1234567890 </span>
                  </div>
                  <div className='flex flex-col'>
                    {data.billingAddress.firstName} {data.billingAddress.lastName}
                    <p className='font-normal'>
                      {data.billingAddress.streetAddress}
                      {data.billingAddress.streetAddress2}<br/>
                      {data.billingAddress.zip } {data.billingAddress.city }, {data.billingAddress.province} {data.billingAddress.country}
                    </p>
                  </div>
                  <span>{formatDate(+data.billingAddress.birthDate,'dd.MM.yyyy')}</span>
                </div>
              )
            : <ErrorLabelRounded isError={true} message='missing data' />}
        </SettingField>
  )
}

export default BillingField