import Dinero, { } from 'dinero.js'

export const format = (num: number): string => {
  const balance = Dinero({ amount: num })
  return balance.toFormat('0,0.00')
}

export const formatToThousands = (num: number): string => {
  const balance = Dinero({ amount: num, precision: 3 })
  return balance.toFormat('0,0.000')
}

export const convertToCents = (amount: number): number => {
  const dinero = Dinero({ amount }).multiply(100)
  return dinero.getAmount()
}

export const convertToBacks = (amount: number): number => {
  const dinero = Dinero({ amount }).divide(100)
  return dinero.getAmount()
}

export const formatToDecimal = (amount: string): string => {
  if (!Number.isNaN(Number(amount))) {
    return parseFloat(Number(amount).toString()).toFixed(2)
  }
  return parseFloat('0').toFixed(2)
}
