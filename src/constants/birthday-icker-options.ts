export const DAYS = Array.from({ length: 31 }, (_, idx) =>  idx < 9 ? `0${idx + 1}` : (idx + 1).toString() )
export const MONTHS = Array.from({ length: 12 }, (_, idx) =>  idx < 9 ? `0${idx + 1}` : (idx + 1).toString() )
export const YEARS = Array.from({ length: 77 }, (_, idx) =>  (new Date().getFullYear() - idx).toString()  )