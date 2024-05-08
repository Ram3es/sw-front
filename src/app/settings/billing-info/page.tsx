'use client'
import InputWithErrors from '@/components/Content/InputWithErrors';
import CheckCircle from '@/components/icons/settings/CheckCircle';
import TriangleExclamation from '@/components/icons/settings/TriangleExclamation';
import { useSettingsContext } from '@/context/SettingsContext';
import { setBillingAddress } from '@/services/user/user';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Navigation';
import { classNames } from '@/helpers/className';
import { useRouter } from 'next/navigation';
import CountryList from '@/components/Content/CountryList';
import BirthdayPicker from '@/components/Content/BirthdayPicker';
import { useAppContext } from '@/context/AppContext';
import { EToastType } from '@/types/Enums';


const ERRROS_STATE: TErrState = {
    firstName: {
      status: false,
      message: '',
      errorClass: 'text-red-500'
  },
    lastName: {
      status: false,
      message: '',
      errorClass: 'text-red-500'
  },
  streetAddress: {
    status: false,
    message: '',
    errorClass: 'text-red-500',
},
  zip: {
      status: false,
      message: '',
      errorClass: 'text-red-500',
  },
    city: {
      status: false,
      message: '',
      errorClass: 'text-red-500',
  },
  country: {
    status: false,
    message: '',
    errorClass: 'text-red-500',
},
birthDate: {
  status: false,
  message: '',
  errorClass: 'text-red-500',
}
}
export interface IInitialState{
  firstName: string
  lastName: string
  streetAddress: string
  streetAddress2: string
  zip: string
  city: string
  province: string
  country: string
  birthDate: number | null
}
const initValues:IInitialState = {
  firstName:  '',
  lastName:  '',
  streetAddress:  '',
  streetAddress2:  '',
  zip:  '',
  city:  '',
  province:  '' ,
  country: '',
  birthDate: null
}

 type TErrState = Record<keyof Omit<IInitialState,'province' | 'streetAddress2'>, IError>
 export interface IError  { status: boolean, message: string, errorClass: string }


const BillingInfo = () => {
  const { data } = useSettingsContext()
  const { showToast } = useAppContext()
  const { back } = useRouter()
  const [errors, setErrors] = useState<TErrState>(ERRROS_STATE)

  const formik = useFormik({
    initialTouched: {
      firstName: false,
      lastName: false,
      streetAddress: false,
      streetAddress2: false,
      zip: false,
      city: false,
      province: false,
      country: false 
    },
    initialValues: initValues,
    validationSchema: Yup.object({
      firstName: Yup.string().min(2).required('This field can not be empty'),
      lastName: Yup.string().min(2).required('This field can not be empty'),
      streetAddress: Yup.string().min(10).required('This field can not be empty'),
      zip: Yup.string().min(4).required('This field can not be empty'),
      city: Yup.string().min(2).required('This field can not be empty'),
      country: Yup.string().required('Selecting country is required.'),
      birthDate:  Yup.number().test('birthday-test',' Please enter valid date', (value) => !!value ).required('This field is required.')
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
        try {
          await setBillingAddress({...values, userId: data?.id, id:data?.billingAddress?.id })
          back()
          showToast('Billing settings have been changed', EToastType.success)

        } catch(error) {
          showToast('Error occurred')
        } 
      } 
  })

  const handleChangeCountry = (value: string) => {
    formik.setFieldValue('country', value, true)
  }

  useEffect(() => {
    Object.keys(errors).forEach((fieldName) => {
      if(formik.touched[fieldName as keyof typeof formik.initialValues] && formik.errors[fieldName as keyof typeof formik.initialValues]){
        setErrors(prev => ({
          ...prev,
          [fieldName]: {
            ...prev[fieldName as keyof TErrState],
            status: true,
            message: formik.errors[fieldName as keyof typeof formik.initialValues] as string}
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          [fieldName]: {
            ...prev[fieldName  as keyof TErrState],
            status: false,
            message: '' }
        }))
      }
    })  
  }, [formik.errors, formik.touched ])

  

  useEffect(() => {
    if(data?.billingAddress.id){
     formik.setValues({ 
      firstName: data.billingAddress.firstName,
      lastName: data.billingAddress.lastName,
      streetAddress: data.billingAddress.streetAddress,
      streetAddress2: data.billingAddress.streetAddress2 ?? '',
      zip: data.billingAddress.zip ,
      city: data.billingAddress.city,
      province: data.billingAddress.province ?? '' ,
      country: data.billingAddress.country,
      birthDate: +data.billingAddress.birthDate || null
     })
    }
  }, [data])

  
    return (
        <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] flex flex-col gap-8 mx-auto '>
             <form onSubmit={formik.handleSubmit} className='text-white flex flex-col gap-4'>
             <InputWithErrors
                label='first name'
                name='firstName'
                value={formik.values.firstName}
                variant='coupon'
                handleChange={(_, e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                error={errors.firstName}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary '
              />
                <InputWithErrors
                label='last name'
                name='lastName'
                value={formik.values.lastName}
                variant='coupon'
                handleChange={(_, e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                error={errors.lastName}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                />
              <div className='border-b border-darkGrey my-6' />
              <InputWithErrors
                label='address line 1'
                name='streetAddress'
                value={formik.values.streetAddress}
                variant='coupon'
                handleChange={(_, e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                error={errors.streetAddress}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                />
                <InputWithErrors
                label='address line 2'
                name='streetAddress2'
                value={formik.values.streetAddress2}
                variant='coupon'
                handleChange={(_, e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                error={errors}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                />
                <div className='grid grid-cols-5 gap-x-4'>
                  <div className='col-span-2'>
                  <InputWithErrors
                    label='ZIP/Postal code'
                    name='zip'
                    value={formik.values.zip}
                    variant='coupon'
                    handleChange={(_, e) => formik.handleChange(e)}
                    onBlur={formik.handleBlur}
                    error={errors.zip}
                    errorBorder='border-2 border-swRed'
                    errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                    successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                    activeClass='focus-within:border-swViolet'
                    wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                    />
                  </div>
                  <div className='col-span-3'>
                  <InputWithErrors
                    label='city'
                    name='city'
                    value={formik.values.city}
                    variant='coupon'
                    handleChange={(_, e) => formik.handleChange(e)}
                    onBlur={formik.handleBlur}
                    error={errors.city}
                    errorBorder='border-2 border-swRed'
                    errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                    successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                    activeClass='focus-within:border-swViolet'
                    wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                    />
                  </div>
                </div>
                <InputWithErrors
                    label='state or province'
                    name='province'
                    value={formik.values.province}
                    variant='coupon'
                    handleChange={(_, e) => formik.handleChange(e)}
                    onBlur={formik.handleBlur}
                    error={errors}
                    errorBorder='border-2 border-swRed'
                    errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                    successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                    activeClass='focus-within:border-swViolet'
                    wrapperClasses='bg-darkGrey border-2 border-darkSecondary'
                    />
                <CountryList value={formik.values.country} onChange={handleChangeCountry}  />
                  <span className={` -mt-2 ml-4 ${errors.country.status ? 'block' : 'hidden'} ${errors.country.errorClass}`}>{errors.country.message}</span>
                  <div className='border-b border-darkGrey my-6' />
                  <BirthdayPicker
                    dateMs={formik.values.birthDate}
                    error={errors.birthDate}
                    onChange={(value: number) => {
                      formik.setFieldValue('birthDate',value, true);
                    }}
                   />
                <div className="flex gap-4 ml-auto mt-8">
                  <Button
                    text='cancel'
                    type="button"
                    className=' bg-black bg-opacity-50 w-full border border-graySecondary group hover:border-white hover:text-white justify-center cta-clip-path uppercase text-graySecondary  [&_.text]:w-max relative'
                    heightClass='h-12'
                    onClick={back}
                  >
                    <div className='absolute w-3 bottom-[3px] -left-[3px] border-b border-graySecondary group-hover:border-white duration-200 rotate-45' />
                  </Button>
                  <Button
                    text='save'
                    type='submit'
                    className={classNames('bg-skinwalletPink justify-center items-center w-full min-w-[100px] h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto cta-clip-path',
                        true  ? '' : 'pointer-events-none grayscale opacity-50')}
                    />
              </div>
             </form>
           </div>
        </div>

    );
};

export default BillingInfo;