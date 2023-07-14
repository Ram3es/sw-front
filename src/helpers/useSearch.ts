import { useEffect, useState } from 'react'

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isShownSuggestions, setIsShowSuggestion] = useState(false)
  const [suggestionList, setSuggestionList] = useState<string[]>([])

  useEffect(() => {
    suggestionList.length &&
    setIsShowSuggestion(true)
  }, [suggestionList])

  return {
    searchValue,
    suggestionList,
    isShownSuggestions,
    setSearchValue,
    setSuggestionList
  }
}
