import { useState } from 'react';

export type TSortOption = 'ASC' | 'DESC'

const sortOptions: TSortOption[] = [
    'ASC',
    'DESC'
    ]

export const useSort = () => {
    const [currentOption, setCurrentOption] = useState<TSortOption>(sortOptions[0])

    return {
        sortOptions,
        currentOption,
        setCurrentOption
    }
}