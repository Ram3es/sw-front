export interface CardItem {
    id: string
    isTradable: boolean;
    timeToTrade?: number;
    image: string;
    isSelected: boolean;
    isNoFee: boolean;
    price: number;
    name: string;
    type: string;
    condition: number;
    onClick: (isSelected: boolean) => void;
  }

  export type TInventoryCard =  CardItem & {isChecked: boolean}
  