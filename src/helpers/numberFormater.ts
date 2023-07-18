import Dinero from 'dinero.js'

export const format = (num: number): string => {
  const balance = Dinero({ amount: num })
  return balance.toFormat('0,0.00')
}
