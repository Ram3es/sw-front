'use client'

import Bar from '@/components/Bar/Bar'
import Checkbox from '@/components/Content/Checkbox'
import { Button } from '@/components/Navigation'
import ErrorLabelRounded from '@/components/funds/ErrorLabelRounded'
import EditPencil from '@/components/icons/EditPencil'
import CheckUnfilled from '@/components/icons/checkout/CheckUnfilled'
import SteamIcon from '@/components/icons/checkout/SteamIcon'
import { CHECKOUT_ERRORS } from '@/constants/checkout'
import { useAppContext } from '@/context/AppContext'
import { useCartContext } from '@/context/CartContext'
import { classNames } from '@/helpers/className'
import { format } from '@/helpers/numberFormater'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useCallback, useState } from 'react'

interface IAgreements {
  policy: boolean
  cancelation: boolean
}

export default function CartCheckout() {
  const { cartItems, getSteamTotalPrice, getDiscount, getTotal } = useCartContext()
  const { user } = useAppContext()
  const router = useRouter();

  const [agreements, setAgreements] = useState<IAgreements>({
    policy: false,
    cancelation: false
  })

  const validateAgreements = useCallback(() => {
    return Object.values(agreements).every((el) => el)
  }, [agreements])

  const isPositiveBalance = () => (user?.balance ?? 0) >= getTotal()

  const isButtonDisabled = () => cartItems.items.length === 0 || !validateAgreements() || !isPositiveBalance

  const handlePlaceOrder = (e: SyntheticEvent) => {
    e.preventDefault()

    if (validateAgreements() && isPositiveBalance()) {
      router.push('/cart/compleate')
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
                  {getTotal() !== 0 && isPositiveBalance() && <CheckUnfilled className="text-swLime" />}
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
                      getTotal() === 0 || !isPositiveBalance() ? 'text-swOrange' : 'text-white'
                    )}
                  >
                    ${format(user?.balance ?? 0)}
                  </span>
                </div>
                {getTotal() === 0 || !isPositiveBalance() ? (
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
                      <SteamIcon className="text-graySecondary" />${format(getSteamTotalPrice())}
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
                disabled={isButtonDisabled()}
                className={classNames(
                  'bg-skinwalletPink justify-center items-center w-full h-[48px] uppercase text-dark-14 hover:opacity-50 duration-200  ml-auto mt-12 cta-clip-path',
                  isButtonDisabled() ? 'opacity-50' : ''
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
