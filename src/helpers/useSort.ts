import { useEffect, useState } from 'react'

export type TSortOption = 'ASC' | 'DESC'

const sortOptions: TSortOption[] = [
  'ASC',
  'DESC'
]

export const useSort = () => {
  const [currentOption, setCurrentOption] = useState<TSortOption>(sortOptions[0])
  const [isASCDirection, setIsASCDirection] = useState(true)

  const toggleSort = () => {
    setIsASCDirection(boolean => !boolean)
  }

  useEffect(() => {
    setCurrentOption(isASCDirection ? sortOptions[0] : sortOptions[1])
  }, [isASCDirection])

  return {
    sortOptions,
    currentOption,
    setCurrentOption,
    toggleSort
  }
}
