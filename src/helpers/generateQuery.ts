export const generateQuery = <T extends Record<string, any>>(
    state: T
    ): string => {
        return Object.entries(state)
          .filter(([_, value]) => value !== null && value !== undefined)
          .reduce((acc, [key, value],idx ,v) => {
             if(!value) return acc
             if(Array.isArray(value) ){
                if(!value.length) return acc
                  return  acc+=`${key}=${value.join()}${idx + 1 === v.length ? '' : '&'}`   
                }
             return acc += `${key}=${value}${idx + 1 === v.length ? '' : '&'}`
    },'')
}