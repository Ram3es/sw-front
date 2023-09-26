'use client'
import InputWithErrors from "@/components/Content/InputWithErrors"
import { Button } from "@/components/Navigation"
import CheckCircle from "@/components/icons/settings/CheckCircle"
import TriangleExclamation from "@/components/icons/settings/TriangleExclamation"
import { useSettingsContext } from "@/context/SettingsContext"
import { classNames } from "@/helpers/className"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import * as Yup from 'yup'
import { useEffect, useState } from "react"

export default function EmailSetup() {
    const [errors, setErrors] = useState({status: false, message: '', errorClass: 'text-red-500' })
    const {data, updateField, showToast } = useSettingsContext()
    const { back } = useRouter()

    const formik = useFormik({
        initialTouched: {
          email: false
        },
        initialValues: {
          email: data?.email ?? ''
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email').required('This field can not be empty')
        }),
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
              await updateField(values)
              back()
              showToast({
                id: 'email',
                message: 'Email was changed',
                type: "success"
              })
            } catch(error) {
              showToast({
                id: 'email-error',
                message: 'Email wasn`t changed',
                type: "error"
              })
            } 
          } 
      })

      useEffect(() => {
        if(formik.touched.email && formik.errors.email){
          setErrors(prev => ({ ...prev, status: true, message: formik.errors.email as string }))
        } else {
          setErrors(prev => ({...prev, status: false, message: ''  }))
        }
      }, [formik.errors.email])

      useEffect(() => {
        if(data?.email){
          formik.setValues({
            email: data?.email
          })
        }
      }, [data])


    return (
        <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] flex flex-col gap-8 mx-auto text-white '>
           <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-8 text-white ">
             <InputWithErrors
                label='email'
                name='email'
                value={formik.values.email}
                variant='coupon'
                handleChange={(_, e) => formik.handleChange(e)}
                onBlur={formik.handleBlur}
                error={errors}
                errorBorder='border-2 border-swRed'
                errorIcon={<TriangleExclamation className='w-6 h-auto text-swRed' />}
                successIcon={<CheckCircle className='w-6 h-auto text-swLime' />}
                activeClass='focus-within:border-swViolet'
                wrapperClasses='bg-darkGrey border-2 border-darkSecondary '
             />
             <div className="flex gap-4 ml-auto">
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
        </div>)
}