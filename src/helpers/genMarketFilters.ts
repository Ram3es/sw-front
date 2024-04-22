import { IFiltersSideBar } from "@/context/MarketOffers";
import { IDefaultFilters, IDefaultOptionRes, IRangeOptions } from "@/types/Market";

export const generateFiltersObject = (defaultFilters: IDefaultFilters[]): IFiltersSideBar | {} => {
    const initFilters: Record<string, any> = {}

    defaultFilters.forEach(filter => {
        if(filter.type === 'range'){
          const { from, to } = filter?.options as IRangeOptions
         return initFilters[filter.name] = { 
          value: typeof filter.value === 'object' ? [filter?.value?.from?.amount, filter?.value?.to?.amount] : filter.value, 
          data: filter?.diagramData?.map((el: { count: any }) => el?.count) ,
          options: [from?.amount, to?.amount]
        }
        }
        if(filter.type === 'multiple-choice-filter'){
          const checkboxoptions = filter?.options as IDefaultOptionRes[]
           return initFilters[filter.name] = checkboxoptions?.map(el => ({...el, selected: false}))
        }
        if(filter.type === 'radio'){
          return initFilters[filter.name] = ({value: filter.value, options:filter.options})
        }
        initFilters[filter.name] = filter.value ?? ''
      })
      return initFilters
}