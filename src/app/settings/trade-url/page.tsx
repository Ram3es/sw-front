'use client'
import InputWithErrors from "@/components/Content/InputWithErrors";
import CheckCircle from "@/components/icons/settings/CheckCircle";
import TriangleExclamation from "@/components/icons/settings/TriangleExclamation";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useFormik } from 'formik'
import { Button } from "@/components/Navigation";
import { classNames } from "@/helpers/className";
import { useRouter } from "next/navigation";
import { useSettingsContext } from "@/context/SettingsContext";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { EToastType } from "@/types/Enums";

export default function TradeUrl() {
    const [errors, setErrors] = useState({status: false, message: '', errorClass: 'text-red-500' })

    const { data, updateField } = useSettingsContext()
    const { showToast } = useAppContext()

    const { back } = useRouter()
 
    const formik = useFormik({
      initialTouched: {
        tradeUrl: false
      },
      initialValues: {
        tradeUrl: ''
      },
      validationSchema: Yup.object({
        tradeUrl: Yup.string().required('Steam Trade URL cannot be empty')
      }),
      validateOnChange: false,
      onSubmit: async (values) => {
          try {
           await updateField(values)
           back()
           showToast('Trade Url was updated', EToastType.success)
          } catch(error) {
            showToast('Error occurred')
          } 
        } 
    })

    useEffect(() => {
      if(formik.touched.tradeUrl && formik.errors.tradeUrl){
        setErrors(prev => ({ ...prev, status: true, message: formik.errors.tradeUrl as string }))
      } else {
        setErrors(prev => ({...prev, status: false, message: ''  }))
      }

    }, [formik.errors.tradeUrl])

    useEffect(() => {
      if(data?.tradeUrl){
        formik.setValues({
          tradeUrl: data?.tradeUrl
        })
      }
    }, [data])


    return (
      <div className='w-full py-16 px-6'>
          <div className='w-full max-w-[672px] flex flex-col gap-8 mx-auto '>
            <div className="flex flex-col">
              <span className="text-base text-graySecondary">Trade URL is required to receive trade offers on your Steam account.</span>
              <Link
                href={`https://steamcommunity.com/profiles/${data?.steamId}/tradeoffers/privacy#trade_offer_access_url`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="underline text-skinwalletPink hover:text-graySecondary duration-200"
              >
                 Find your Trade URL here
              </Link>
            </div>
            <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-2 text-white ">
              <InputWithErrors
                  name="tradeUrl"
                  label='steam trade url'
                  value={formik.values.tradeUrl}
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
                  type='button'
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
    )
}