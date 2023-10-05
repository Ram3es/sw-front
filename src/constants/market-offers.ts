export interface IOtherFilter {
    name: string
    selected: boolean
    filter: string
  }

  export interface IRarityFilter {
    name: string
    selected: boolean
    numberOfItems: number
  }

  export interface IOfferFilter {
    id: number
    name: string
    filter: string
    selected: boolean
  }

  export const OFFERS_FILTER: IOfferFilter[]  = [
    {
      id: 1,
      name: 'All',
      filter: 'all',
      selected: true
    },
    {
      id: 2,
      name: 'Hot deals',
      filter: 'hotdeals',
      selected: false
    },
  ]

export const RARITY_FILTER: IRarityFilter[]  = [
    {
    name: 'Contraband',
    selected: false,
    numberOfItems: 12
    },
    {
    name: 'Covert',
    selected: false,
    numberOfItems: 201
    },
    {
    name: 'Classified',
    selected: false,
    numberOfItems: 98
    },
    {
    name: 'Restricted',
    selected: false,
    numberOfItems: 52
    },
    {
    name: 'Mil-Spec Grade',
    selected: false,
    numberOfItems: 24
    },
    {
    name: 'Industrial Grade',
    selected: false,
    numberOfItems: 17
    },
    {
    name: 'Consumer Grade',
    selected: false,
    numberOfItems: 1
    } 
]

export const OTHER_FILTER: IOtherFilter[] = [
    {
      name: 'StarTrak™',
      selected: false,
      filter: 'sattrack'
    },
    {
      name: 'Souvenir',
      selected: false,
      filter: 'tournament'
    },
    {
      name: 'Sticker',
      selected: false,
      filter: 'unusual'
    }
  ]