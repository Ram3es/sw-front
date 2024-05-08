interface ICheckoutErrors {
  BILLING_WARNING: string
  PAYMENT_WARNING: string
  BILLING_NOTICE: string
  PAYMENT_NOTICE: string
}

export const CHECKOUT_ERRORS: ICheckoutErrors = {
  BILLING_WARNING: 'billing details missing',
  PAYMENT_WARNING: 'not enough funds',
  BILLING_NOTICE:
    'Before you can make full use of Skinwallet account, we need to collect some more personal details. Please verify or update your billing address below.',
  PAYMENT_NOTICE:
    'Please top-up your balance with missing amount first, to finalize the order. Add funds with your Mastercard, Visa, Union Pay, via wire transfer or even use your current Skinwallet Instant balance'
}

interface CheckoutModal {
  DURATION_MODAL_CART_ADDED: number
}

export const CHECKOUT_SETTINGS: CheckoutModal = {
  DURATION_MODAL_CART_ADDED: 3000
}

export const CART_SESSION_STORAGE_KEY = 'skinwallet_cart'