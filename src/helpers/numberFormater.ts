import Dinero, { } from 'dinero.js'

export const format = (num: number): string => {
  const balance = Dinero({ amount: num })
  return balance.toFormat('0,0.00')
}

export const convertToCents = (amount: number): number => {
  const dinero = Dinero({ amount }).multiply(100)
  return dinero.getAmount()
}

export const convertToBacks = (amount: number): number => {
  const dinero = Dinero({ amount }).divide(100)
  return dinero.getAmount()
}

export const formatToDecimal = (amount: number) => {
  const dinero = Dinero({ amount })
  return dinero.toFormat('0.00')
}
