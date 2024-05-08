

export const useDebounce = () => {
    let timerId: ReturnType<typeof setTimeout> | null
    
    const debounce = (func: (...args: any[]) => void, delay: number) => {
        return (...args: any[]) => {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            func(...args);
            timerId = null;
          }, delay);
        };
      };
      return debounce

}

