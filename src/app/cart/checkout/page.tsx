'use client'

import Bar from '@/components/Bar/Bar'
import Checkbox from '@/components/Content/Checkbox'
import { Button } from '@/components/Navigation'
import ErrorLabelRounded from '@/components/funds/ErrorLabelRounded'
import EditPencil from '@/components/icons/EditPencil'
import CheckUnfilled from '@/components/icons/checkout/CheckUnfilled'
import { CHECKOUT_ERRORS } from '@/constants/checkout'
import { useAppContext } from '@/context/AppContext'
import { useCartContext } from '@/context/CartContext'
import { classNames } from '@/helpers/className'
import { format } from '@/helpers/numberFormater'
import Link from 'next/link'
import { SyntheticEvent, useCallback, useState } from 'react'

interface IAgreements {
  policy: boolean
  cancelation: boolean
}

export default function CartCheckout() {
  const { cartItems, getSteamTotalPrice, getDiscount, getTotal } = useCartContext()
  const { user } = useAppContext()

  const [agreements, setAgreements] = useState<IAgreements>({
    policy: false,
    cancelation: false
  })

  const validateAgreements = useCallback(() => {
    return Object.values(agreements).every((el) => el)
  }, [agreements])

  const handlePlaceOrder = (e: SyntheticEvent) => {
    e.preventDefault()

    if (validateAgreements() && (user?.balance ?? 0) >= getTotal()) {
      console.log('place order successful')
    } else {
      console.log('order bad')
    }
  }

  return (
    <>
      <Bar>
        <div className="flex justify-between items-center h-full px-6">
          <h1 className="text-white font-Barlow text-[21px] font-medium uppercase">checkout</h1>
        </div>
      </Bar>
      <form onSubmit={handlePlaceOrder}>
        <div className="w-full flex flex-col lg:flex-row flex-grow gap-8 justify-center pt-6 sm:py-12">
          <div className="w-full h-full lg:max-w-[672px] pb-10 px-6 lg:px-0 text-white overflow-y-scroll relative flex flex-col gap-4">
            <div
              className={classNames(
                'pt-4 px-6 space-y-4 lg:space-y-0 lg:grid grid-cols-12 bg-darkGrey',
                user?.billingAddress ? 'pb-8' : 'pb-4'
              )}
            >
              <div className="col-span-4 flex items-start">
                <div className="flex items-center gap-2">
                  {user?.billingAddress && <CheckUnfilled className="text-swLime" />}
                  <span className="text-graySecondary uppercase tracking-[1.44px] text-18">billing</span>
                </div>
              </div>
              <div className="col-span-8 col-start-5 ">
                {!user?.billingAddress ? (
                  <div className="flex flex-col gap-4">
                    <ErrorLabelRounded isError={true} message={CHECKOUT_ERRORS.BILLING_WARNING} />
                    <p className="text-graySecondary text-sm leading-[21px] font-normal">
                      {CHECKOUT_ERRORS.BILLING_NOTICE}
                    </p>
                    <div className="mt-2 w-full sm:w-max relative overflow-hidden hover button">
                      <Link href="/settings/billing-info">
                        <Button
                          text="enter data"
                          className="bg-transparent bg-opacity-50 w-full border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary text-23 small-caps leading-[24px] tracking-[2.3px] [&_.text]:mb-1"
                          heightClass="h-12"
                        />
                        <div className="absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-5 lg:col-span-4 flex flex-col gap-6">
                      <div className="text-lg leading-[26px] text-white">
                        <p className="font-medium">Skins and More Co.</p>
                        <p className="font-normal">PL1234567890</p>
                      </div>
                      <div className="text-lg leading-[26px] text-white">
                        <p className="font-medium">{`${user?.billingAddress?.firstName} ${user?.billingAddress?.lastName}`}</p>
                        <p className="font-normal">{`${user?.billingAddress?.streetAddress} ${user?.billingAddress?.zip} ${user?.billingAddress?.province}, ${user?.billingAddress?.country}`}</p>
                      </div>
                      <div className="text-lg leading-[26px] text-white">
                        <p className="font-medium">11.03.1997</p>
                      </div>
                    </div>
                    <Link className="justify-self-end col-span-1 col-start-6" href="/settings/billing-info">
                      <EditPencil className="cursor-pointer text-graySecondary hover:text-white duration-200" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="pb-8 pt-4 px-6 space-y-4 lg:space-y-0 lg:grid grid-cols-12 bg-darkGrey">
              <div className="col-span-4 flex items-start">
                <div className="flex items-center gap-2">
                  {getTotal() !== 0 && (user?.balance ?? 0) >= getTotal() && <CheckUnfilled className="text-swLime" />}
                  <span className="text-graySecondary uppercase tracking-[1.44px] text-18">payment</span>
                </div>
              </div>
              <div className="col-span-8 col-start-5 flex flex-col gap-4">
                <ErrorLabelRounded
                  isError={getTotal() === 0 || (user?.balance ?? 0) > getTotal()}
                  message={CHECKOUT_ERRORS.PAYMENT_WARNING}
                />
                <div className="w-full flex items-center justify-between">
                  <span className="font-medium leading-4 text-base">Your balance</span>
                  <span
                    className={classNames(
                      'font-medium leading-4 text-base',
                      getTotal() === 0 || !((user?.balance ?? 0) >= getTotal()) ? 'text-swOrange' : 'text-white'
                    )}
                  >
                    ${format(user?.balance ?? 0)}
                  </span>
                </div>
                {getTotal() === 0 || !((user?.balance ?? 0) >= getTotal()) ? (
                  <>
                    <p className="text-graySecondary text-sm leading-[21px] font-normal">
                      {CHECKOUT_ERRORS.PAYMENT_NOTICE}
                    </p>
                    <div className="mt-2 w-full sm:w-max relative overflow-hidden hover button">
                      <Link href="/wallet">
                        <Button
                          text="add funds"
                          className="bg-transparent bg-opacity-50 w-full border border-graySecondary  hover justify-center cta-clip-path uppercase text-graySecondary text-23 small-caps leading-[24px] tracking-[2.3px] [&_.text]:mb-1"
                          heightClass="h-12"
                        />
                        <div className="absolute w-4 bottom-1 -left-1 border-b border-graySecondary hover rotate-45" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="text-graySecondary font-normal text-sm">
                    Your Wallet will be charged a total of{' '}
                    <span className="font-medium text-white">${format(getTotal())}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-[24px_1fr] gap-3">
              <Checkbox
                activeClass={
                  agreements.policy ? 'text-swViolet bg-white border-white' : 'bg-transparent border-graySecondary'
                }
                additionalClasses="bg-transparent"
                checked={agreements.policy}
                onChange={() => setAgreements((prev) => ({ ...prev, policy: !prev.policy }))}
              />
              <p className="font-normal text-sm">
                I agree to the{' '}
                <Link href="/">
                  <span className="underline text-skinwalletPink">Terms of Service</span>
                </Link>{' '}
                and{' '}
                <Link href="/">
                  <span className="underline text-skinwalletPink">Privacy Policy</span>
                </Link>
                .
              </p>
            </div>
            <div className="grid grid-cols-[24px_1fr] gap-3">
              <Checkbox
                activeClass={
                  agreements.cancelation ? 'text-swViolet bg-white border-white' : 'bg-transparent border-graySecondary'
                }
                additionalClasses="bg-transparent"
                checked={agreements.cancelation}
                onChange={() => setAgreements((prev) => ({ ...prev, cancelation: !prev.cancelation }))}
              />
              <div className="flex flex-col gap-5 justify-end font-normal text-sm">
                <p>
                  I have read and understood my{' '}
                  <Link href="/">
                    <span className="underline text-skinwalletPink">right of cancellation</span>
                  </Link>
                  .
                </p>
                <p>
                  I agree to the beggining of the contract execution before the end of the cancellation period. I am
                  aware that I thereby lose my right of cancellation.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-[calc(100vh_-_234px)] sm:h-full lg:max-w-[320px] flex flex-col justify-between sm:flex-row sm:gap-8">
            <div className="h-max w-full lg:w-[320px] text-graySecondary bg-darkGrey p-6 sm:cta-clip-path relative">
              <div className="w-full border-b border-white/10 mb-6 flex flex-col gap-4">
                <div className="uppercase tracking-[1.44px] text-18">summary</div>
                <div className="mb-6 flex flex-col gap-4">
                  {cartItems.items.map((cartItem) => (
                    <div
                      key={cartItem.inventoryItemId}
                      className="grid col-span-12 gap-2 text-white font-medium text-base"
                    >
                      <span className="col-span-9 truncate">{cartItem.name}</span>
                      <span className="place-self-end span-3 col-start-10">${format(cartItem.price.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <div className="w-full flex justify-between items-center text-sm">
                    <div className="uppercase tracking-[1.12px]">steam price</div>
                    <span className="flex gap-2 items-center">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.5625 7.75C13.5625 6.54688 13.2344 5.39844 12.6328 4.35938C12.0312 3.32031 11.2109 2.5 10.1719 1.89844C9.13281 1.29688 7.98438 0.96875 6.78125 0.96875C5.57812 0.96875 4.48438 1.26953 3.5 1.81641C2.51562 2.36328 1.69531 3.12891 1.06641 4.05859C0.4375 5.01562 0.0820312 6.05469 0 7.20312L3.63672 8.70703C3.99219 8.48828 4.40234 8.37891 4.83984 8.37891L6.45312 6.02734V6C6.45312 5.28906 6.69922 4.6875 7.19141 4.19531C7.68359 3.70312 8.28516 3.45703 8.99609 3.45703C9.70703 3.45703 10.3086 3.70312 10.8008 4.19531C11.293 4.6875 11.5664 5.28906 11.5664 6C11.5664 6.71094 11.293 7.33984 10.8008 7.83203C10.2812 8.35156 9.65234 8.59766 8.94141 8.57031L6.64453 10.2109C6.64453 10.7578 6.48047 11.25 6.09766 11.6328C5.71484 12.0156 5.25 12.207 4.73047 12.207C4.23828 12.207 3.82812 12.0703 3.5 11.7695C3.14453 11.4961 2.92578 11.1133 2.84375 10.6758L0.246094 9.60938C0.492188 10.5391 0.929688 11.3867 1.58594 12.1523C2.21484 12.918 2.98047 13.4922 3.88281 13.9023C4.78516 14.3398 5.74219 14.5312 6.78125 14.5312C7.98438 14.5312 9.13281 14.2305 10.1719 13.6289C11.2109 13.0273 12.0312 12.1797 12.6328 11.1406C13.2344 10.1016 13.5625 8.98047 13.5625 7.75ZM4.26562 11.25C4.53906 11.3594 4.78516 11.3594 5.05859 11.25C5.33203 11.1406 5.52344 10.9492 5.63281 10.6758C5.74219 10.4023 5.74219 10.1562 5.63281 9.88281C5.52344 9.60938 5.33203 9.41797 5.08594 9.30859L4.21094 8.95312C4.56641 8.81641 4.92188 8.81641 5.27734 8.98047C5.63281 9.14453 5.87891 9.39062 6.04297 9.74609C6.20703 10.1289 6.20703 10.4844 6.04297 10.8398C5.87891 11.2227 5.63281 11.4688 5.27734 11.6328C4.89453 11.7969 4.53906 11.7969 4.18359 11.6328C3.82812 11.4961 3.58203 11.25 3.41797 10.9219L4.26562 11.25ZM9.02344 7.69531C9.46094 7.69531 9.87109 7.53125 10.1992 7.20312C10.5273 6.875 10.7188 6.49219 10.7188 6C10.7188 5.53516 10.5273 5.125 10.1992 4.79688C9.87109 4.46875 9.46094 4.30469 8.99609 4.30469C8.53125 4.30469 8.12109 4.46875 7.79297 4.79688C7.46484 5.125 7.30078 5.53516 7.30078 6C7.30078 6.49219 7.46484 6.875 7.79297 7.20312C8.12109 7.53125 8.53125 7.69531 9.02344 7.69531ZM9.02344 7.28516C8.64062 7.28516 8.33984 7.17578 8.09375 6.90234C7.84766 6.65625 7.73828 6.35547 7.73828 6C7.73828 5.67188 7.84766 5.37109 8.09375 5.09766C8.33984 4.85156 8.64062 4.71484 8.99609 4.71484C9.35156 4.71484 9.65234 4.85156 9.92578 5.09766C10.1719 5.37109 10.3086 5.67188 10.3086 6C10.3086 6.35547 10.1719 6.65625 9.92578 6.90234C9.65234 7.17578 9.35156 7.28516 9.02344 7.28516Z"
                          fill="#A4A4A4"
                        />
                      </svg>
                      ${format(getSteamTotalPrice())}
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center text-sm">
                    <div className="uppercase tracking-[1.12px]">your discount</div>
                    <span className="text-white">${format(getDiscount())}</span>
                  </div>
                  <div className="w-full flex justify-between items-center text-sm">
                    <div className="uppercase tracking-[1.12px]">total</div>
                    <span className="text-2xl leading-6 text-white ">${format(getTotal())}</span>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                text="place order"
                disabled={cartItems.items.length === 0 || !validateAgreements() || !((user?.balance ?? 0) >= getTotal())}
                className={classNames(
                  'bg-skinwalletPink justify-center items-center w-full h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                  cartItems.items.length === 0 || !validateAgreements() || !((user?.balance ?? 0) >= getTotal()) ? 'opacity-50' : ''
                )}
              />
              <div
                className="w-full absolute left-0 -top-10 h-10 sm:hidden"
                style={{ background: 'linear-gradient(180deg, rgba(20, 20, 21, 0.00) 0%, #0D0D0D 100%)' }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
