export const generateQuery = <T extends Record<string, any>>(
    state: T
    ): string => { 
        const rawQuery = Object.entries(state)
          .filter(([_, value]) => !!value || value === 0)
          .reduce((acc, [key, value],idx ,v) => {
             if(Array.isArray(value) ){
                if(!value.length) return acc
                  return  acc+=`${key}=${value.join()}${idx + 1 === v.length ? '' : '&'}`   
                }
             return acc += `${key}=${value}${idx + 1 === v.length ? '' : '&'}`
    },'')
    return rawQuery ? '?'.concat(rawQuery) : ''
}