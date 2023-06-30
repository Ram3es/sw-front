export const format = (num:number): string => num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})